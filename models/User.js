const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

// create user model
class User extends Model {
    // set up method to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
        // if(loginPw == this.password){
        }
    }
// }

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
            defaultValue: 0
        },
        photography: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        active_efr: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        active_O2: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        active_dm: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        active_instructor: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
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