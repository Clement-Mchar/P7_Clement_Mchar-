const bcrypt = require("bcrypt");
const { user } = require("../models");
const jwt = require("jsonwebtoken");

const maxAge = 24 * 60 * 60 * 1000;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: 24 * 60 * 60 * 1000,
	});
};

exports.signUp = (req, res) => {
	if (req.body.password.length > 6) {
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) => {
				const User =  user.create({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					password: hash,
				});
				User.save()
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
	user
		.findOne({ where: { email } })
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
					console.log(user.id);
					const token = createToken(user.id);
					res.cookie("jwt", token, { httpOnly: true, maxAge });
					res.status(200).json({user: user.id});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

module.exports.logout = (req, res) => {
	res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
	res.redirect("");
};
