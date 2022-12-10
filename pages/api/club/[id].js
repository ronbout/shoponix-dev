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
    // do not currently allow deleting of clubs
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
    const club = await prisma.club.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        parents: true,
      },
    });

    delete club.user.password;

    res.status(200).json({ club });
  } catch (error) {
    res.status(500).send("Error accessing Clubs: ", error);
  }
};

const handlePutRequest = async (req, res) => {
  try {
    const { id } = req.query;
    // const { id, name, price, description, productType, mediaUrl } = req.body;
    const club = await prisma.club.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
      include: {
        user: true,
        parents: true,
      },
    });

    delete club.user.password;

    res.status(203).json({ club });
  } catch (error) {
    res.status(500).send("Error updating Club: ", error);
  }
};

const handleDeleteRequest = async (req, res) => {
  const { id } = req.query;
  try {
    const club = await prisma.club.findUnique({
      where: {
        id,
      },
    });
    const userId = club.userId;
    await prisma.club.delete({
      where: {
        id: id,
      },
    });
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    await prisma.parents.deleteMany({
      where: {
        clubId: id,
      },
    });
    res.status(204).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting Club and related info: ", error);
  }
};
