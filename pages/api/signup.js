import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check email, name, password format
    if (!isLength(name, { min: 3, max: 15 })) {
      return res.status(422).send("Name must be 3-10 characters long");
    } else if (!isLength(password, { min: 5, max: 15 })) {
      return res.status(422).send("Password must be 5-15 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(422).send(`User already exist with that ${email}`);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
    });

    delete newUser.password;
    delete newUser.createdAt;
    delete newUser.updatedAt;

    // console.log(newUser);
    // create a cart for the new user
    const cart = await prisma.cart.create({
      data: {
        userId: newUser.id,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in signup. Please try again.");
  }
};
