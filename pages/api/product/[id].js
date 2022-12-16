import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

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
  try {
    const { id } = req.query;
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        viewCount: { increment: 1 },
        lastVisited: new Date(),
      },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        productTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).send("Error accessing product on the Server" + error);
  }
};

const handlePutRequest = async (req, res) => {
  // console.log(req.body)
  const { id, name, price, description, productType, mediaUrl } = req.body;

  await prisma.product.update({
    where: {
      id: id,
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
  //   { id },
  //   {
  //     $set: { name, price, description, productType, mediaUrl },
  //     $currentDate: { updatedAt: true },
  //   }
  // );
  // console.log(up)
  res.status(203).send("Product Updated");
};

const handleDeleteRequest = async (req, res) => {
  const { id } = req.query;
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    await prisma.orderProducts.deleteMany({
      where: {
        productId: id,
      },
    });
    await prisma.cartProducts.deleteMany({
      where: {
        productId: id,
      },
    });
    // await Product.findByIdAndDelete({ id });
    // await Cart.updateMany(
    //   { "products.product": id },
    //   { $pull: { products: { product: id } } }
    // );
    // await Order.updateMany(
    //   { "products.product": id },
    //   { $pull: { products: { product: id } } }
    // );
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting products");
  }
};
