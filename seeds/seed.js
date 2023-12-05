const userData = require('./user-seeds')
const { User }= require('../models')
const sequelize = require('../config/connection')



const seedDB = async () => {
    await sequelize.sync({ force: true })
    console.log('DATABASE SYNCED')

    await User.bulkCreate(userData)
    console.log('USERS SEEDED')

    process.exit(0)
}

seedDB()