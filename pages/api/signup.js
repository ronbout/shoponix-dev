import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  const { firstname, lastname, email, password, password2, userType } =
    req.body;

  const passLength = 2; // for testing not typing 8!!

  try {
    // check email, name, password format
    if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    } else if (!isLength(password, { min: passLength })) {
      return res
        .status(422)
        .send("Password must be at least 8 characters long");
    } else if (password !== password2) {
      return res.status(422).send("Passwords must match");
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
        firstname,
        lastname,
        email,
        role: userType,
        password: passwordHash,
      },
    });

    delete newUser.password;
    delete newUser.createdAt;
    delete newUser.updatedAt;

    // console.log(newUser);
    // create a cart for the new user
    // const cart = await prisma.cart.create({
    //   data: {
    //     userId: newUser.id,
    //   },
    // });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in signup. Please try again.");
  }
};
