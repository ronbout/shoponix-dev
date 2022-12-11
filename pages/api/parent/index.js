import prisma from "../../../lib/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  try {
    let parents = await prisma.parent.findMany({
      include: {
        user: true,
        club: true,
        cart: true,
        order: true,
      },
    });

    parents = parents.map((parent) => {
      delete parent.user.password;
      return parent;
    });
    res.status(200).json({ parents });
  } catch (error) {
    // console.error(error)
    res.status(500).send("Error accessing Parents: ", error);
  }
};

const handlePostRequest = async (req, res) => {
  const { userId, firstname, lastname } = req.body;
  try {
    if (!userId || !firstname || !lastname) {
      return res.status(422).send("Parent missing one or more fields");
    }

    const parentInfo = await prisma.parent.create({
      data: {
        userId,
        firstname,
        lastname,
      },
    });

    res.status(200).json(parentInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating parent: ", error);
  }
};
