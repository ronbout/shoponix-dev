import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import Order from "../../models/Order";

export default async (req, res) => {
	const { email, cartTotal } = req.body;
	// console.log(req.body);

	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);
		const cart = await Cart.findOne({ user: userId }).populate({
			path: "products.product",
			model: "Product",
		});

		await new Order({
			user: userId,
			email,
			total: cartTotal,
			products: cart.products,
		}).save();

		await Cart.findOneAndUpdate(
			{ _id: cart._id },
			{ $set: { products: [] } }
		);

		res.status(200).send("Checkout successful!");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error proccessing charge");
	}
};
