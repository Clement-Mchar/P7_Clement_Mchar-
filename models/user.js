"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ like, post, comment }) {
			this.hasMany(like,  { foreignKey: "userId" }, { onDelete: 'cascade', hooks:true } );
			this.hasMany(post, { foreignKey: "userId" }, { onDelete: 'cascade', hooks:true });
			this.hasMany(comment, { foreignKey: "userId" }, { onDelete: 'cascade', hooks:true });
		}
		toJSON() {
			return {
				...this.get(),
				password: undefined,
				email: undefined,
			};
		}
	}
	user.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have a first name" },
					notEmpty: { msg: "name must not be empty" },
					len: [2, 50],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have a last name" },
					notEmpty: { msg: "name must not be empty" },
					len: [2, 50],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: { msg: "Email must be a valid email address" },
					notNull: { msg: "User must have an email" },
					notEmpty: { msg: "Email must not be empty" },
					len: [5, 50],
				},

				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have a password" },
					notEmpty: { msg: "Password must not be empty" },
					len: [6, 1024],
				},
			},
			profilPicture: {
				type: DataTypes.STRING,
				defaultValue: "../uploads/profil/random-User.png",
			},
			bio: {
				type: DataTypes.STRING,
				validate: {
					len: [0, 1024],
				},
			},
		},
		{
			sequelize,
			modelName: "user",
		}
	);
	return user;
};
