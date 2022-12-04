import prisma from "../../lib/prisma";

export default async (req, res) => {
  const { page, size } = req.query;
  try {
    const pageNum = Number(page);
    const pageSize = Number(size);
    let customers = [];
    let totalDocts = await prisma.user.count();
    // let totalDocts = await User.countDocuments();
    const totalPages = Math.ceil(totalDocts / pageSize);
    const skips = pageSize * (pageNum - 1);

    customers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: skips,
      take: pageSize,
    });

    // customers = await User.find()
    // 	.sort({ createdAt: "desc" })
    // 	.skip(skips)
    // 	.limit(pageSize);

    res.status(200).json({ customers, totalPages });
  } catch (error) {
    // console.error(error)
    res.status(403).send("Please login");
  }
};
