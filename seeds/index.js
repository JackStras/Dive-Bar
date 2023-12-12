const userData = require('./user-seeds')
const threadData = require('./thread-seeds')
const { User, Threads }= require('../models')
const sequelize = require('../config/connection')

// hello team

const seedDB = async () => {
    await sequelize.sync({ force: true })
    console.log('DATABASE SYNCED')

    await User.bulkCreate(userData)
    console.log('USERS SEEDED')

    await Threads.bulkCreate(threadData)
    console.log('THREADS SEEDED')

    process.exit(0)
}

seedDB()