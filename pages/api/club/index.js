import shortid from "shortid";
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
    let clubs = await prisma.club.findMany({
      include: {
        user: true,
        parents: true,
      },
    });

    clubs = clubs.map((club) => {
      delete club.user.password;
      return club;
    });
    res.status(200).json({ clubs });
  } catch (error) {
    // console.error(error)
    res.status(500).send("Error accessing Clubs: ", error);
  }
};

const handlePostRequest = async (req, res) => {
  const { userId, clubname } = req.body;
  try {
    if (!userId || !clubname) {
      return res.status(422).send("Club missing one or more fields");
    }

    const club = await prisma.club.create({
      data: {
        userId,
        clubname,
      },
    });

    res.status(200).json(club);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating club: ", error);
  }
};
