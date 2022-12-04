import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
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

    const products = await prisma.product.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalProducts = products.length;

    // const products = await Product.find({ user: userId }).sort({ createdAt: 'desc' })
    // const totalProducts = await Product.countDocuments({ user: userId });
    res.status(200).json({ products, totalProducts });
  } catch (error) {
    // console.error(error);
    res.status(403).send("Please login");
  }
};
