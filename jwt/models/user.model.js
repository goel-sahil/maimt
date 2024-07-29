const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');

class User extends Model { }

// Define the User model
User.init(
    {
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
            comment: 'Name of the user',
        },
        email: {
            type: DataTypes.STRING(120),
            unique: true,
            allowNull: false,
            comment: 'Email address of the user, must be unique',
        },
        password: {
            type: DataTypes.STRING(120),
            allowNull: false,
            comment: 'Hashed password of the user',
        },
        job_title: {
            type: DataTypes.STRING(120),
            allowNull: true,
            comment: 'Job title of the user',
        },
    },
    {
        sequelize, // The sequelize instance
        modelName: 'User', // The name of the model
        tableName: 'users', // The table name
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
        createdAt: 'created_at', // Customize the name of `createdAt`
        updatedAt: 'updated_at', // Customize the name of `updatedAt`
        comment: 'Table to store user information', // Description of the table
    },
);

module.exports = User;
