import prisma from "../../../lib/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    // case "POST":
    //   await handlePostRequest(req, res);
    //   break;
    // case "PUT":
    //   await handlePutRequest(req, res);
    //   break;
    // case "DELETE":
    //   await handleDeleteRequest(req, res);
    //   break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  try {
    let merchants = await prisma.store.findMany();

    res.status(200).json({ merchants });
  } catch (error) {
    // console.error(error)
    res.status(500).send("Error accessing Merchants: ", error);
  }
};

const handlePostRequest = async (req, res) => {
  res.status(405).send(`Post method not allowed`);
};
