import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      include: {
        club: true,
        parent: true,
      },
      orderBy: {
        role: "asc",
      },
    });

    // const users = await User.find({ id: {$ne: userId} }).sort({role: 'asc'});
    res.status(200).json(users);
  } catch (error) {
    // console.error(error)
    res.status(403).send("Please login");
  }
};
