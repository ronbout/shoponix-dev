import prisma from "../../lib/prisma";

export default async (req, res) => {
  try {
    const { page = 1, size = 100, searchTerm = "" } = req.query;
    // console.log(searchTerm)
    // string to number
    const pageNum = Number(page);
    const pageSize = Number(size);
    const skips = pageSize * (pageNum - 1);
    let products = [];
    let totalDocts;
    if (searchTerm) {
      totalDocts = await prisma.product.count({
        where: {
          OR: [
            {
              productType: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      // totalDocts = await Product.countDocuments({
      //   $or: [
      //     { productType: { $regex: `^${searchTerm}` } },
      //     { name: new RegExp(searchTerm, "i") },
      //   ],
      // });
    } else {
      totalDocts = await prisma.product.count();
      // totalDocts = await Product.countDocuments();
    }
    const totalPages = Math.ceil(totalDocts / pageSize);
    if (searchTerm) {
      products = await prisma.product.findMany({
        where: {
          OR: [
            {
              productType: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          viewCount: "desc",
        },
        skip: skips,
        take: pageSize,
      });
      // products = await Product.find({
      //   $or: [
      //     { productType: { $regex: `^${searchTerm}` } },
      //     { name: new RegExp(searchTerm, "i") },
      //   ],
      // })
      //   .collation({ locale: "en", strength: 1 })
      //   .sort({ viewCount: "desc" })
      //   .limit(pageSize);
    } else {
      products = await prisma.product.findMany({
        orderBy: {
          viewCount: "desc",
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
        skip: skips,
        take: pageSize,
      });

      // if (pageNum === 1) {
      //   products = await Product.find().sort({ name: "desc" }).limit(pageSize);
      // } else {
      //   const skips = pageSize * (pageNum - 1);
      //   products = await Product.find()
      //     .sort({ name: "desc" })
      //     .skip(skips)
      //     .limit(pageSize);
      // }
    }

    // const products = await Product.find();
    res.status(200).json({ products, totalPages });
  } catch (error) {
    res.status(403).json(error);
  }
};
