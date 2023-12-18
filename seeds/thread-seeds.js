const { User, Threads } = require('../models')

const threadData = [
    {
        comment: 'Panda bears are freaks of nature',
        poster: 'example_2',
        poster_id: 2,
        user_id: 1
    },
    {
        comment: 'Agreed, pandas are just uncool',
        poster: 'example_2',
        poster_id: 2,
        user_id: 1
    },
    {
        comment: 'Make sure to pay your taxes',
        poster: 'example_2',
        poster_id: 2,
        user_id: 2
    },
    {
        comment: 'I am running out of things to write',
        poster: 'example_2',
        poster_id: 2,
        user_id: 3
    },
    {
        comment: 'This is the fifth test comment',
        poster: 'example_2',
        poster_id: 2,
        user_id: 3
    },
    {
        comment: 'It is 7:32 PM on 12/6/2023, and I am drinking a cherry coke.',
        poster: 'example_2',
        poster_id: 2,
        user_id: 3
    }
]

module.exports = threadData