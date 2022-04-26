const { user, post, like, comment } = require("../models");

module.exports.readPost = async (req, res) => {
	try {
		const posts = await post.findAll(
			{
				include: [
					{ model: user, attributes: ["firstName", "lastName", "profilPicture"] },
					{ model: like, attributes: ["postId"]},
					{ model: comment, attributes: ["firstName", "lastName", "message"] }
				],
			},
		);
		return res.json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports.createPost = async (req, res) => {
	const { message, video } = req.body;
	try {
		const userPost = await user.findOne({ where: { id: req.auth.userId } });

		const posts = await post.create({
			firstName: userPost.firstName,
			lastName: userPost.lastName,
			message,
			userId: userPost.id,
			picture: `${req.protocol}://${req.get("host")}/post/${
				req.file.filename
			}`,
			video,
		});
		return res.json(posts);
	} catch (err) {
		console.error();
		return res.status(500).json(err);
	}
};

module.exports.updatePost = async (req, res) => {
	const id = req.params.id;
	try {
		const posts = await post.findOne({
			where: { id },
		});

		posts.body = req.body.body;
		posts.picture = req.body.picture;
		posts.video = req.body.video;
		await posts.save();
		return res.json({ posts });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

module.exports.deletePost = async (req, res) => {
	const id = req.params.id;
	try {
		const posts = await post.findOne({
			where: { id },
		});

		await posts.destroy();
		return res.json({ message: "Post deleted !" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

module.exports.likePost = async (req, res, next) => {
	const id = req.params.id;
	try {
		const likedPost = await post.findOne({
			where: { id },
			include: [{ model: like, attributes: ["postId", "userId"] }],
		});

		const alreadyLiked = await like.findOne({
			where: { userId: req.auth.userId },
		});
		if (!alreadyLiked) {
			await like.create({
				postId: likedPost.id,
				userId: req.auth.userId,
			});
		}

		await likedPost.save(likedPost);
		return res.json({ likedPost });
	} catch (err) {
		console.error();
		return res.status(500).json({ error: "Something went wrong" });
	}
};

module.exports.unlikePost = async (req, res) => {
	const id = req.params.id;
	try {
		const likedPost = await post.findOne({
			where: { id },
			include: [{ model: like, attributes: ["postId", "userId"] }],
		});

		const stillLiked = await like.findOne({
			where: { userId: req.auth.userId },
		});
		if (stillLiked) {
			await stillLiked.destroy();
		}

		await likedPost.save(likedPost);
		return res.json({ likedPost });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};
