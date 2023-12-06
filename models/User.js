const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

// create user model
class User extends Model {
    // set up method to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        certifications: {
            type: DataTypes.STRING,
        },
        gas_mixes: {
            type: DataTypes.STRING,
        },
        ow_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        deep_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        cave_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        night_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        shark_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        wreck_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        drift_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        deco_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ice_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        altitude_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        drysuit_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        tech_dive_totals: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        photography: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        active_efr: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        active_O2: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        active_dm: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        active_instructor: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        hooks: {
            // set up bcrypt before create
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up bcrypt after update 
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;