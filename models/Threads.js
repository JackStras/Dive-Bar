const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Threads extends Model { }

Threads.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: Datatypes.STING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'threads'
    }
)

module.exports = Threads;