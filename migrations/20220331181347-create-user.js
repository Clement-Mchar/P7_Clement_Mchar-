"use strict";
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable("user", {
			id: {
				allowNull: false,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have a name" },
					notEmpty: { msg: "name must not be empty" },
					len: [5, 50],
				},
			},
			email: {
				type: DataTypes.STRING,
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
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have a password" },
					notEmpty: { msg: "Password must not be empty" },
				},
			},
			picture: {
				type: DataTypes.STRING,
				defaultValue: "../uploads/profil/random-user.png",
			},
			bio: {
				type: DataTypes.STRING,
				validate: {
					len: [0, 1024],
				},
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
		await queryInterface.dropTable("user");
	},
};
