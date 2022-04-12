'use strict';

const user = require( "../models/user" );

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('like', {
      id: {
        allowNull: false,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user', key: 'id'
        }
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'post', key: 'id'
        }
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('like');
  }
};