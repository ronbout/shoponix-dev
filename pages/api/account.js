import User from '../../models/User';
import jwt from 'jsonwebtoken';
import Store from '../../models/Store';
import connectDb from '../../utils/connectDb';

// Connect db
connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "PUT":
            handlePutRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
    }
}

const handleGetRequest = async (req, res) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No autorization token");
    }

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: userId })
        const store = await Store.findOne({ user: userId })
        if (user) {
            res.status(200).json({ user, store });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(403).send("Invalid token");
    }
}

const handlePutRequest = async (req, res) => {
    const { _id, role } = req.body;
    await User.findOneAndUpdate(
        { _id },
        { role }
    )
    res.status(203).send('User Updated');
}