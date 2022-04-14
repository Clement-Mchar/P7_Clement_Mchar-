const bcrypt = require("bcrypt");
const { sequelize, user, post } = require("../models");
const authCheck = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
	if (req.body.password.length > 6) {
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) => {
				const User = new user({
					name: req.body.name,
					email: req.body.email,
					password: hash,
				});
				User

					.save()
					.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
					.catch((error) => res.status(401).json({ error }));
			})
			.catch((error) => res.status(500).json({ error }));
	} else {
		res.status(500).json("Le mot de passe est trop court");
	}
};
exports.login = (req, res) => {
	const email = req.body.email;
	user.findOne({ where: { email } })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					const logged = {
						userId: user.id,
						token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
							expiresIn: "24h",
						}),
					};
					logged;

					res.status(200).json(logged);
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

module.exports.logout = (req, res) => {
	res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
	res.redirect('/api/users/');


};
