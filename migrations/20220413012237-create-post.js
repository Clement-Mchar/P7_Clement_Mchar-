'use strict';
module.exports = {
  async up(queryInterface, Sequelize, DataTypes) {
    await queryInterface.createTable('posts', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			message: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			picture: {
				type: Sequelize.STRING,
			},
			video: {
				type: Sequelize.STRING,
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};