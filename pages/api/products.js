import prisma from "../../lib/prisma";

export default async (req, res) => {
  try {
    const { page = 0, size = 0, searchTerm = "", cat = false } = req.query;
    // console.log(searchTerm)
    // string to number
    const pageNum = Number(page);
    const pageSize = Number(size);
    const skips = pageSize ? pageSize * (pageNum - 1) : 0;
    let products = [];
    let totalProducts;

    let whereClause = false;
    if (searchTerm) {
      if (cat) {
        whereClause = {
          OR: [
            {
              productCategories: {
                some: {
                  category: {
                    name: {
                      contains: searchTerm,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          ],
        };
      } else {
        whereClause = {
          OR: [
            {
              productCategories: {
                some: {
                  category: {
                    name: {
                      contains: searchTerm,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
            {
              productTags: {
                some: {
                  tag: {
                    name: {
                      contains: searchTerm,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        };
      }
    }

    if (searchTerm) {
      totalProducts = await prisma.product.count({
        ...(whereClause && { where: whereClause }),
      });
    } else {
      totalProducts = await prisma.product.count();
    }
    const totalPages = pageSize ? Math.ceil(totalProducts / pageSize) : 1;
    if (searchTerm) {
      products = await prisma.product.findMany({
        ...(whereClause && { where: whereClause }),
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
        ...(pageSize && { skip: skips, take: pageSize }),
      });
    } else {
      products = await prisma.product.findMany({
        ...(whereClause && { where: whereClause }),
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
        ...(pageSize && { skip: skips, take: pageSize }),
      });
    }

    // const products = await Product.find();
    res.status(200).json({ products, totalPages, totalProducts });
  } catch (error) {
    res.status(403).json(error);
  }
};
