"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		static associate({ post }) {
			this.hasMany(post, { foreignKey: "userId" });
		}
		toJSON() {
			return {
				...this.get(),
				id: undefined,
				password: undefined,

			};
		}
	}
	user.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have a name" },
					notEmpty: { msg: "name must not be empty" },
					len: [5, 50],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: { msg: "Email must be a valid email address" },
					notNull: { msg: "User must have an email" },
					notEmpty: { msg: "Email must not be empty" },
					len: [15, 50],
				},

				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have a password" },
					notEmpty: { msg: "Password must not be empty" },
				},
			},
			picture: {
				type: DataTypes.STRING,
				defaultValue: "../uploads/profil/random-User.png",
			},
			bio: {
				type: DataTypes.STRING,
				validate: {
					len: [0, 1024],
				},
			},
			likes: {
				type: DataTypes.ARRAY(DataTypes.STRING),
			},
		},
		{
			sequelize,
			tableName: "users",
			modelName: "user",
		}
	);
	return user;
};
