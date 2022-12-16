import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

export default async (req, res) => {
  switch (req.method) {
    // case "GET":
    //   await handleGetRequest(req, res);
    //   break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    // case "PUT":
    //   await handlePutRequest(req, res);
    //   break;
    // case "DELETE":
    //   await handleDeleteRequest(req, res);
    //   break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
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

    res.status(200).json(product);
  } catch (error) {
    // console.error(error)
    res
      .status(500)
      .send("Error creating product on the Server" + JSON.stringify(error));
  }
};
