import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import calculateCartTotal from "../../utils/calculateCartTotal";
import prisma from "../../lib/prisma";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentData } = req.body;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // const cart = await Cart.findOne({ user: userId }).populate({
    //   path: "products.product",
    //   model: "Product",
    // });
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
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    });
    const isExistingCustomer = prevCustomer.data.length > 0;
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      });
    }
    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    await stripe.charges.create(
      {
        currency: "usd",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
      },
      {
        idempotency_key: uuidv4(),
      }
    );

    await prisma.order.create({
      data: {
        userId,
        email: paymentData.email,
        total: cartTotal,
        products: cart.products,
      },
    });

    // await new Order({
    //   user: userId,
    //   email: paymentData.email,
    //   total: cartTotal,
    //   products: cart.products,
    // }).save();

    await prisma.cartProducts.delete({
      where: {
        cartId: cart.id,
      },
    });

    // await Cart.findOneAndUpdate({ id: cart.id }, { $set: { products: [] } });

    res.status(200).send("Checkout successful!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error proccessing charge");
  }
};
