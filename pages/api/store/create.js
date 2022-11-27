import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import Store from '../../../models/Store';
import connectDb from '../../../utils/connectDb';

connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await handlePostRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}

const handlePostRequest = async (req, res) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("Not authenticated");
    }
    const { name, web, email, aboutText } = req.body;
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        // check email, name, aboutText format
        if (!isLength(name, { min: 3, max: 15 })) {
            return res.status(422).send("Name must be 3-15 characters long");
        } else if (!isLength(aboutText, { min: 15, max: 500 })) {
            return res.status(422).send("About texts must be 15-500 characters long");
        } else if (!isEmail(email)) {
            return res.status(422).send("Email must be valid");
        }

        const store = await Store.findOne({
            $or: [
                { user: userId },
                { email }
            ]
        });

        if (store) {
            return res.status(422).send(`Store already exist with that user || email`);
        }

        const newStore = await new Store({
            user: userId,
            name,
            web,
            email,
            aboutText
        }).save();

        res.status(200).send("Successfully created the store & it is now pending, after approval from admin you can create products.");
    } catch (error) {
        console.log(error)
    }
}