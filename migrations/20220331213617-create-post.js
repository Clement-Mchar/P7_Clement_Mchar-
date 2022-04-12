"use strict";
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable("post", {
			id: {
				allowNull: false,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			message: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'user', key: 'id'
				  }
			},
			picture: {
				type: DataTypes.STRING,
			},
			video: {
				type: DataTypes.STRING,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable("post");
	},
};
