import Store from '../../../models/Store';
import connectDb from '../../../utils/connectDb';

connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}


const handleGetRequest = async (req, res) => {
    const { page, size } = req.query;
    try {
        const pageNum = Number(page);
        const pageSize = Number(size);
        let stores = [];
        let totalDocts = await Store.countDocuments();
        const totalPages = Math.ceil(totalDocts / pageSize);

        if (pageNum === 1) {
            stores = await Store.find().sort({ createdAt: 'desc' }).limit(pageSize);
        } else {
            const skips = pageSize * (pageNum - 1)
            stores = await Store.find().sort({ createdAt: 'desc' }).skip(skips).limit(pageSize);
        }
        res.status(200).json({ stores, totalPages });
    } catch (error) {
        console.log(error)
    }
}

const handlePutRequest = async (req, res) => {
    const { _id, status } = req.body;
    await Store.findOneAndUpdate(
        { _id },
        { status }
    )
    res.status(203).send(`Request ${status}`);
}