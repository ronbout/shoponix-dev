import shortid from "shortid";
import Product from "../../models/Product";
import Cart from "../../models/Cart";
import Order from "../../models/Order";
import connectDb from "../../utils/connectDb";
import prisma from "../../lib/prisma";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
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
  const { id } = req.query;
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      viewCount: { increment: 1 },
    },
  });
  // const product = await Product.findOneAndUpdate(
  //   { _id: id },
  //   { $inc: { viewCount: 1 } }
  // );
  const { productType } = product;
  const related = await prisma.product.findMany({
    where: {
      productType,
    },
    take: 4,
    orderBy: {
      viewCount: "desc",
    },
  });
  // const related = await Product.find({
  //   productType: productType,
  // })
  //   .sort({ viewCount: "desc" })
  //   .limit(4);
  res.status(200).json({ product, related });
};

const handlePostRequest = async (req, res) => {
  const { name, price, description, productType, mediaUrl, userId, storeId } =
    req.body;
  // console.log(req.body)
  const sku = shortid.generate();
  try {
    if (!name || !price || !description || !sku || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        description,
        productType,
        mediaUrl,
        userId,
        storeId,
      },
    });
    // const product = await new Product({
    //   name,
    //   sku,
    //   price,
    //   description,
    //   productType,
    //   mediaUrl,
    //   user: userId,
    //   store: storeId,
    // }).save();

    res.status(200).json(product);
  } catch (error) {
    // console.error(error)
    res.status(500).send("Error creating product on the Server");
  }
};

const handlePutRequest = async (req, res) => {
  // console.log(req.body)
  const { _id, name, price, description, productType, mediaUrl } = req.body;

  await prisma.product.update({
    where: {
      id: _id,
    },
    data: {
      name,
      price,
      description,
      productType,
      mediaUrl,
    },
  });

  // await Product.updateOne(
  //   { _id },
  //   {
  //     $set: { name, price, description, productType, mediaUrl },
  //     $currentDate: { updatedAt: true },
  //   }
  // );
  // console.log(up)
  res.status(203).send("Product Updated");
};

const handleDeleteRequest = async (req, res) => {
  const { _id } = req.query;
  try {
    await prisma.product.delete({
      where: {
        id: _id,
      },
    });
    await prisma.orderProducts.delete({
      where: {
        productId: _id,
      },
    });
    await prisma.cartProducts.delete({
      where: {
        productId: _id,
      },
    });
    // await Product.findByIdAndDelete({ _id });
    // await Cart.updateMany(
    //   { "products.product": _id },
    //   { $pull: { products: { product: _id } } }
    // );
    // await Order.updateMany(
    //   { "products.product": _id },
    //   { $pull: { products: { product: _id } } }
    // );
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting products");
  }
};
