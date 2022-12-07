import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import Order from "../../models/Order";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  const { email, cartTotal } = req.body;
  // console.log(req.body);

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        cartProducts: {
          include: {
            product: true,
          },
        },
      },
    });
    // const cart = await Cart.findOne({ user: userId }).populate({
    // 	path: "products.product",
    // 	model: "Product",
    // });

    await prisma.order.create({
      data: {
        userId,
        email,
        total: cartTotal,
        products: cart.products,
      },
    });

    // await new Order({
    // 	user: userId,
    // 	email,
    // 	total: cartTotal,
    // 	products: cart.products,
    // }).save();

    await prisma.cartProducts.delete({
      where: {
        cartId: cart.id,
      },
    });

    // await Cart.findOneAndUpdate(
    // 	{ id: cart.id },
    // 	{ $set: { products: [] } }
    // );

    res.status(200).send("Checkout successful!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error proccessing charge");
  }
};
