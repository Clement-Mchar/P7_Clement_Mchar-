"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class like extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ post }) {
			this.belongsTo(post, { foreignKey: "postId" });
		}
	}
	like.init(
		{
			userId: {
				type: DataTypes.INTEGER,

			},
			postId: {
				type: DataTypes.INTEGER,
        
			},
		},
		{
			sequelize,
			modelName: "like",
      tableName: "likes"
		}
	);
	return like;
};
