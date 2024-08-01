const sequelize = require('./db');
const { DataTypes, Model } = require('sequelize');
class UserAddress extends Model { }

UserAddress.init(
    {
        // Model attributes are defined here
        address: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'UserAddress', // We need to choose the model name,
        tableName: 'user_addresses',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

module.exports = UserAddress;