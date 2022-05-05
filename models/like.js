"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize, DataTypes) => {
	class like extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ post, user }) {
			this.belongsTo(post);
			this.belongsTo(user);
		}
	}
	like.init(
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				
			},
			postId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "like",
		}
	);
	return like;
};
