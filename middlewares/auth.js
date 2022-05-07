const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				console.log(err);
				
				res.send(200).json("no token");
			} else {
				res.send(decodedToken.id);
			}
		});
	} else {
		return res.send(500);
	}
};

//simple modèle pour vérifier l'authentification, on récupère le cookie et on le compare avec le token secret
