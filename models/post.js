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
			this.hasMany(like, { foreignKey: "postId" });
			this.belongsTo(user, { foreignKey: "userId" });

			//this.hasMany(comment, { foreignKey: "commenterId" });
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
				userId: undefined,
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
