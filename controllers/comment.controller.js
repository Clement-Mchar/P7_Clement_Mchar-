const { user, comment, post, like } = require("../models");

module.exports.readComment = async (req, res) => {
	try {
		const comments = await comment.findAll({
			where: { postId: req.params.id },
			include: [
				{ model: user, attributes: ["firstName", "lastName", "picture"] },
				{ model: like, attributes : ["postId"]},
				{ model: comment, attributes: ["firstName", "lastName", "message"] }
			]
		});
		return res.json(comments);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports.createComment = async (req, res) => {
	const { message } = req.body;
	const id = req.params.id;
	try {
		const userComment = await user.findOne({ where: { id: req.auth.userId } });
		const postComment = await await post.findOne({
			where: { id },
			include: [
				{ model: user, attributes: ["firstName", "lastName", "picture"] },
				{ model: like, attributes : ["postId"]},
				{ model: comment, attributes: ["firstName", "lastName", "message"] }
			],
		});

		await comment.create({
			firstName: userComment.firstName,
			lastName: userComment.lastName,
			message,
			userId: userComment.id,
			postId: postComment.id,
		});
		return res.json(postComment);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports.deleteComment = async (req, res) => {
	const id = req.params.id;
	try {
		const comments = await comment.findOne({
			where: { id },
		});
		if (comments.userId === req.auth.userId) {
			await comments.destroy();
			return res.json({ message: "Comment deleted !" });
		}
		return res.json({message: "You can't do that"})
	} catch (err) {
		console.error();
		return res.status(500).json({ error: "Something went wrong" });
	}
};
