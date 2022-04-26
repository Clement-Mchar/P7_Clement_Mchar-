"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
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
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isEmail: { msg: "Email must be a valid email address" },
					notNull: { msg: "User must have an email" },
					notEmpty: { msg: "Email must not be empty" },
					len: [15, 50],
				},

				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have a password" },
					notEmpty: { msg: "Password must not be empty" },
					len: [0, 1024],
				},
			},
			picture: {
				type: Sequelize.STRING,
				defaultValue: "../uploads/profil/random-User.png",
			},
			bio: {
				type: Sequelize.STRING,
				validate: {
					len: [0, 1024],
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("users");
	},
};
