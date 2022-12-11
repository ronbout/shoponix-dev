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
    // case "DELETE":
    // do NOT  allow deleting of parents as orders would be lost
    // await handleDeleteRequest(req, res);
    // break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  try {
    const { id } = req.query;
    const parentInfo = await prisma.parent.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        club: true,
        cart: true,
        order: true,
      },
    });

    delete parentInfo.user.password;

    res.status(200).json({ parentInfo });
  } catch (error) {
    res.status(500).send("Error accessing Parents: ", error);
  }
};

const handlePutRequest = async (req, res) => {
  try {
    const { id } = req.query;
    const parentInfo = await prisma.parent.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
      include: {
        user: true,
        club: true,
        cart: true,
        order: true,
      },
    });

    delete parentInfo.user.password;

    res.status(203).json({ parentInfo });
  } catch (error) {
    res.status(500).send("Error updating Parent: ", error);
  }
};

const handleDeleteRequest = async (req, res) => {
  const { id } = req.query;
  try {
    const parent = await prisma.parent.findUnique({
      where: {
        id,
      },
    });
    const userId = parent.userId;
    await prisma.parent.delete({
      where: {
        id: id,
      },
    });
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    /**
     * TODO: not currently deleting parents
     * would lose order info
     *
     */
    // await prisma.parents.deleteMany({
    //   where: {
    //     parentId: id,
    //   },
    // });
    res.status(204).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting Parent and related info: ", error);
  }
};
