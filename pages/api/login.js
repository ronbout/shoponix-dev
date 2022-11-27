import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";
import User from "../../models/User";

connectDb();

export default async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(404).send("User does not exists");
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (passwordsMatch) {
			const token = jwt.sign(
				{ userId: user._id },
				process.env.JWT_SECRET,
				{ expiresIn: "7d" }
			);
			res.status(200).json(token);
		} else {
			res.status(401).send("Password not match");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Error logging in user");
	}
};
