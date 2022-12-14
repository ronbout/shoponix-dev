import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

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
    });
    // const product = await Product.findOneAndUpdate(
    //   { id: id },
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
  } catch (error) {
    res.status(500).send("Error accessing product on the Server" + error);
  }
};

const handlePostRequest = async (req, res) => {
  const {
    name,
    price,
    description = "",
    mediaUrl = "",
    storeId,
    sku,
    categoryIds = [],
    tagIds = [],
    colorChoices = [],
    sizeChoices = [],
  } = req.body;
  // console.log(req.body)
  try {
    if (!name || !price || !description || !sku || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }

    let product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        description,
        mediaUrl,
        storeId,
        colorChoices,
        sizeChoices,
      },
    });

    const productId = product.id;

    // now update category and tag many to many table
    if (categoryIds.length) {
      const categoryData = categoryIds.map((catId) => {
        return {
          productId: productId,
          categoryId: catId,
        };
      });

      await prisma.productCategories.createMany({
        data: categoryData,
      });
    }
    if (tagIds.length) {
      const tagData = tagIds.map((tagId) => {
        return {
          productId: productId,
          tagId: tagId,
        };
      });

      await prisma.productTags.createMany({
        data: tagData,
      });
    }

    product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        productCategories: true,
        productTags: true,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    // console.error(error)
    res
      .status(500)
      .send("Error creating product on the Server" + JSON.stringify(error));
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
