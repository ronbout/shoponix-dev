import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

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
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        OrderProducts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ orders });
  } catch (error) {
    // console.error(error);
    res.status(403).send("Please login");
  }
};

const handlePutRequest = async (req, res) => {
  const { id, status } = req.body;
  await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      status,
    },
  });
  res.status(203).send("Order Updated");
};
