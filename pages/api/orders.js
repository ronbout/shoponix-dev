import jwt from 'jsonwebtoken';
import Order from '../../models/Order';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    switch (req.method){
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}

const handleGetRequest = async (req, res) => {
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const orders = await Order.find({ user: userId })
        .sort({ createdAt: 'desc' })
        .populate({
            path: "products.product",
            model: "Product"
        });
        res.status(200).json({ orders });
    } catch (error) {
        // console.error(error);
        res.status(403).send("Please login");
    }
}

const handlePutRequest = async (req, res) => {
    const { _id, status } = req.body;
    await Order.findOneAndUpdate(
        {_id},
        {status}
    )
    res.status(203).send('Order Updated');
   
}