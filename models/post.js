"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, Sequelize) => {
	class post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ user, comment, like }) {
			this.hasMany(like, { foreignKey: "postId" }, { onDelete: 'cascade', hooks:true});
			this.belongsTo(user);
			this.hasMany(comment, { foreignKey: "postId" }, { onDelete: 'cascade', hooks:true });

			//this.hasMany(comment, { foreignKey: "commenterId" });
		}

		toJSON() {
			return {
				...this.get(),
			};
		}
	}
	post.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,

			},
			message: {
				type: DataTypes.STRING,
				allowNull: false,
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
			picture: {
				type: DataTypes.STRING,
			},
			video: {
				type: DataTypes.STRING,
			},
		},

		{
			sequelize,

			modelName: "post",
		}
	);
	return post;
};
