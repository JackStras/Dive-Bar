const { User } = require('../models/User')

const userData = [
    {
        id: 1,
        username: 'example_1',
        email: 'diver1@gmail.com',
        password: 'password',
        certifications: 'OWD',
        gas_mixes: 'Air',
        ow_dive_totals: 33,
        deep_dive_totals: 5,
        cave_dive_totals: 0,
        night_dive_totals: 1,
        shark_dive_totals: 3,
        wreck_dive_totals: 0,
        drift_dive_totals: 13,
        deco_dive_totals: 0,
        ice_dive_totals: 0,
        altitude_dive_totals: 0,
        drysuit_dive_totals: 0,
        tech_dive_totals: 0,
        photography: true,
        active_efr: false,
        active_02: false,
        active_dm: false,
        active_instructor: false
    },
    {
        id: 2,
        username: 'example_2',
        email: 'diver2@gmail.com',
        password: 'password2',
        certifications: 'AOWD',
        gas_mixes: 'Nitrox',
        ow_dive_totals: 112,
        deep_dive_totals: 31,
        cave_dive_totals: 0,
        night_dive_totals: 17,
        shark_dive_totals: 6,
        wreck_dive_totals: 4,
        drift_dive_totals: 41,
        deco_dive_totals: 0,
        ice_dive_totals: 0,
        altitude_dive_totals: 1,
        drysuit_dive_totals: 0,
        tech_dive_totals: 0,
        photography: true,
        active_efr: true,
        active_02: false,
        active_dm: false,
        active_instructor: false
    }
]

const seedUser = () => User.bulkCreate(userData)

module.exports = seedUser