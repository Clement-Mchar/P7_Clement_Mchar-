const { sequelize, user, post, like } = require("../models");

module.exports.readPost = async (req, res) => {
	try {
		const posts = await post.findAll(
			{
				include: [{ model: user, attributes: ["name", "picture"] }],
			},
			{ include: [{ model: like, attributes: ["postId", "userId"] }] }
		);
		return res.json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports.createPost = async (req, res) => {
	const { message, picture, video } = req.body;
	try {
		const userPost = await user.findOne({ where: { id: req.auth.userId } });

		const posts = await post.create({
			message,
			userId: userPost.id,
			picture,
			video,
		});
		return res.json(posts);
	} catch (err) {
		console.log(err);
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
		const userLiked = await user.findOne({ where: { id: req.auth.userId } });
		await like.findOne({ where: { userId: userLiked.id } });

		await like.create({
			postId: likedPost.id,
			userId: userLiked.id,
		});

		await likedPost.save(likedPost);
		return res.json({ likedPost });
	} catch (err) {
		console.log(err);
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
		
		const Like = await like.findOne({
			where: { postId: likedPost.id, userId: req.auth.userId },
		});
			await Like.destroy();
			await likedPost.save(likedPost);
			return res.json({ likedPost });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};