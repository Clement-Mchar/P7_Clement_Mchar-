const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				// res.cookie("jwt", "", { maxAge: 1 });
				next();
			} else {
				await userModel.findOne(decodedToken.id);
				res.locals.user = user;
				console.log(user);
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.send(200).json("no token");
			} else {
				console.log(decodedToken.id);
				res.send(200).json(res.locals.user)
				next();
			}
		});
	} else {
		console.log("No token");
	}
};
