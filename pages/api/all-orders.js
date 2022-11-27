import Order from '../../models/Order';
import connectDb from '../../utils/connectDb';
// Connect DB
connectDb();

export default async (req, res) => {
    const orders = await Order.find()
        .sort({ createdAt: 'desc' })
        .populate({
            path: "products.product",
            model: "Product"
        });
    // console.log(orders)
    res.status(200).json({ orders });
}