'use strict';
module.exports = {
  async up ( queryInterface, Sequelize ) {
    await queryInterface.createTable( 'comments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a first name" },
          notEmpty: { msg: "name must not be empty" },
          len: [ 2, 50 ],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a last name" },
          notEmpty: { msg: "name must not be empty" },
          len: [ 2, 50 ],
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,

      },
      postId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );
  },
  async down ( queryInterface, Sequelize ) {
    await queryInterface.dropTable( 'comments' );
  }
};