import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

const handleGetRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No autorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await prisma.User.findUnique({ where: { id: userId } });
    const store = await prisma.store.findFirst({ where: { userId } });
    if (user) {
      res.status(200).json({ user, store });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};

const handlePutRequest = async (req, res) => {
  const { _id, role } = req.body;
  await prisma.user.update({
    where: {
      id: _id,
    },
    data: {
      role,
    },
  });
  res.status(203).send("User Updated");
};
