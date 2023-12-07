const { User, Threads } = require('../models')

const threadData = [
    {
        id: 1,
        comment: 'Panda bears are freaks of nature',
        user_id: 1
    },
    {
        id: 2,
        comment: 'Agreed, pandas are just uncool',
        user_id: 1
    },
    {
        id: 3,
        comment: 'Make sure to pay your taxes',
        user_id: 2
    },
    {
        id: 4,
        comment: 'I am running out of things to write',
        user_id: 3
    },
    {
        id: 5,
        comment: 'This is the fifth test comment',
        user_id: 3
    },
    {
        id: 6,
        comment: 'It is 7:32 PM on 12/6/2023, and I am drinking a cherry coke.',
        user_id: 3
    }
]

module.exports = threadData