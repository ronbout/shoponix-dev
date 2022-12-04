import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Not authenticated");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        CartProducts: {
          include: {
            product: true,
          },
        },
      },
    });
    // const cart = await Cart.findOne({ user: userId }).populate({
    //   path: "products.product",
    //   model: "Product",
    // });
    const products = cart.CartProducts ? cart.CartProducts : [];
    res.status(200).json(products);
  } catch (error) {
    // console.error(error);
    res.status(403).send("Please login");
  }
};

const handlePutRequest = async (req, res) => {
  const { quantity, productId } = req.body;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Not authenticated");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // const cart = await Cart.findOne({ user: userId });
    const cart = await prisma.cart.findFirst({ where: { userId } });
    // const productExists = cart.products.some(doc => ObjectId(productId).equals (doc.product));
    const productExists = await prisma.cartProducts.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (productExists) {
      await prisma.cartProducts.update({
        where: {
          id: productExists.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      // await Cart.findOneAndUpdate(
      //     { _id: cart._id, "products.product":  productId},
      //     { $inc: { "prodcts.$.quantity": quantity } }
      // )
    } else {
      // const newProduct = { quantity, product: productId };
      await prisma.cartProducts.create({
        data: {
          quantity,
          cartId: cart.id,
          productId,
        },
      });
      // await Cart.findByIdAndUpdate(
      //     { _id: cart._id },
      //     { $addToSet: { products: newProduct } }
      // )
    }

    res.status(200).send("Cart updated");
  } catch (error) {
    // console.error(error);
    res.status(403).send("Please login");
  }
};

const handleDeleteRequest = async (req, res) => {
  const { productId } = req.query;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Not authenticated");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // const userId = "a6e52b56-c683-4ebe-815b-fda653fc13e1";
    let cart = await prisma.cart.findFirst({ where: { userId } });
    // res.status(200).json(cart);
    await prisma.cartProducts.deleteMany({
      where: {
        productId,
        cartId: cart.id,
      },
    });
    const cartProducts = await prisma.cartProducts.findMany({
      where: { cartId: cart.id },
      include: {
        product: true,
      },
    });
    // const cart = await Cart.findOneAndUpdate(
    //   { user: userId },
    //   { $pull: { products: { product: productId } } },
    //   { new: true }
    // ).populate({
    //   path: "products.product",
    //   model: "Product",
    // });

    const products = cartProducts ? cartProducts : [];
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login");
  }
};
