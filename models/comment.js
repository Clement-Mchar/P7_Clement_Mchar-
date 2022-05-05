"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ post, user }) {
			this.belongsTo(post);
			this.belongsTo(user);
		}
		toJSON() {
			return {
				...this.get(),
			};
		}
	}
	comment.init(
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
			message: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			postId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "comment",
		}
	);
	return comment;
};
