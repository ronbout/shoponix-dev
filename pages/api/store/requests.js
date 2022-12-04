import prisma from "../../../lib/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  const { page, size } = req.query;
  try {
    const pageNum = Number(page);
    const pageSize = Number(size);
    let stores = [];
    // let totalDocts = await Store.countDocuments();
    let totalDocts = await prisma.store.count();
    const totalPages = Math.ceil(totalDocts / pageSize);
    const skips = pageSize * (pageNum - 1);

    stores = await prisma.store.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: skips,
      take: pageSize,
    });

    // stores = await Store.find()
    //   .sort({ createdAt: "desc" })
    //   .skip(skips)
    //   .limit(pageSize);

    res.status(200).json({ stores, totalPages });
  } catch (error) {
    console.log(error);
  }
};

const handlePutRequest = async (req, res) => {
  const { id, status } = req.body;

  await prisma.store.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  // await Store.findOneAndUpdate({ _id }, { status });
  res.status(203).send(`Request ${status}`);
};
