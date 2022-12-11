import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.update({
      where: { email },
      data: {
        lastActive: new Date(),
      },
      include: {
        club: true,
        parent: true,
      },
    });
    if (!user) {
      return res.status(404).send("User does not exists");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const token = jwt.sign(
        {
          userId: user.id,
          userRole: user.role,
          ...(user.club?.id && { clubId: user.club.id }),
          ...(user.parent?.id && { parentId: user.parent.id }),
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const body = JSON.stringify({
        token,
        role: user.role,
      });
      res.status(200).json(body);
    } else {
      res.status(401).send("Password not match");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user");
  }
};
