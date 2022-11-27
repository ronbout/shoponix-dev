import User from '../../models/User';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    const { page, size } = req.query;
    try {
        const pageNum = Number(page);
        const pageSize = Number(size);
        let customers = [];
        let totalDocts = await User.countDocuments();
        const totalPages = Math.ceil(totalDocts / pageSize);

        if (pageNum === 1) {
            customers = await User.find().sort({ createdAt: 'desc' }).limit(pageSize);
        } else {
            const skips = pageSize * (pageNum - 1)
            customers = await User.find().sort({ createdAt: 'desc' }).skip(skips).limit(pageSize);
        }
        res.status(200).json({ customers, totalPages });
    } catch (error) {
        // console.error(error)
        res.status(403).send("Please login");
    }
}