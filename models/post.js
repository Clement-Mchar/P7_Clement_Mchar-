"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ user, comment, like }) {
			this.belongsTo(user, { foreignKey: "userId" });
			this.hasMany(Like, { foreignKey: "postId" });

			//this.hasMany(comment, { foreignKey: "commenterId" });
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
				userId: undefined,
				uuid: undefined,
			};
		}
	}
	Post.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			body: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			picture: {
				type: DataTypes.STRING,
			},
			video: {
				type: DataTypes.STRING,
			},
			likers: {
				type: DataTypes.INTEGER,
				required: true,
			},
		},

		{
			sequelize,
			tableName: "post",
			modelName: "post",
		}
	);
	return post;
};
