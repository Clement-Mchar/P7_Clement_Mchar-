const { user, post } = require("../models");
const fs = require("fs");
module.exports.getAllUsers = async (req, res) => {
	const users = await user.findAll();
	res.status(200).json(users);
};

module.exports.getUser = async (req, res) => {
	const id = req.params.id;
	try {
		const users = await user.findOne({
			where: { id },
			include: [
				{ model: post, attributes: ["firstName", "lastName", "message"] },
			],
		});
		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

module.exports.updateUser = async (req, res) => {
	const id = req.params.id;

	try {
		const users = await user.findOne({
			where: { id },
		});
		const resultHandler = (err) => {
			if (err) {
				console.log("unlink failed", err);
			} else {
				console.log("file deleted");
			}
		};

		const filename = await users.profilPicture.split("/profil/")[1];
		fs.unlink(
			`${__dirname}/../client/public/uploads/profil/${filename}`,
			resultHandler
		);
		users.bio = req.body.bio;
		users.profilPicture = `${req.protocol}://${req.get("host")}/profil/${
			req.file.filename
		}`;

		await users.save();
		return res.json({ users });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

module.exports.deleteUser = async (req, res) => {
	const id = req.params.id;
	try {
		const users = await user.findOne({
			where: { id },
		});

		await users.destroy();
		return res.json({ message: "user deleted !" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};
