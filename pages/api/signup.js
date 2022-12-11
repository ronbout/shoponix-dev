import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  const {
    firstname,
    lastname,
    clubname = "",
    email,
    password,
    password2,
    userType,
  } = req.body;

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
    } else if ("club" === userType && !isLength(clubname, { min: 3 })) {
      return res
        .status(422)
        .send("Clubname must be at least 3 characters long");
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
    let newUser;
    if ("club" === userType) {
      newUser = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          role: userType,
          password: passwordHash,
          club: {
            create: {
              clubname,
            },
          },
        },
        include: {
          parent: true,
          club: true,
        },
      });
    } else {
      newUser = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          role: userType,
          password: passwordHash,
          parent: {
            create: {
              firstname,
              lastname,
            },
          },
        },
        include: {
          parent: true,
          club: true,
        },
      });

      // create a cart for the new parent
      const cart = await prisma.cart.create({
        data: {
          parentId: newUser.parent.id,
        },
      });
    }
    delete newUser.password;
    delete newUser.createdAt;
    delete newUser.updatedAt;

    // console.log(newUser);

    const token = jwt.sign(
      {
        userId: newUser.id,
        userRole: newUser.role,
        ...(newUser.club?.id && { clubId: newUser.club.id }),
        ...(newUser.parent?.id && { parentId: newUser.parent.id }),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in signup. Please try again.");
  }
};
