const { User } = require('../models')

const userData = [
    {
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
        altitude_dive_totals: 0,
        tech_dive_totals: 0,
        photography: true,
        active_efr: false,
        active_O2: false,
        active_dm: false,
        active_instructor: false
    },
    {
        username: 'example_2',
        email: 'diver2@gmail.com',
        password: 'password2',
        certifications: 'AOWD Rescue',
        gas_mixes: 'Nitrox Air',
        ow_dive_totals: '112',
        deep_dive_totals: '31',
        cave_dive_totals: 0,
        night_dive_totals: 17,
        shark_dive_totals: 6,
        wreck_dive_totals: 4,
        drift_dive_totals: 41,
        altitude_dive_totals: 1,
        tech_dive_totals: 0,
        photography: true,
        active_efr: true,
        active_O2: false,
        active_dm: false,
        active_instructor: false
    },
    {
        username: 'example_3',
        email: 'diver3@gmail.com',
        password: 'password3',
        certifications: 'OWD AOWD Master Rescue Instructor',
        gas_mixes: 'Nitrox Air',
        ow_dive_totals: 200,
        deep_dive_totals: 80,
        cave_dive_totals: 3,
        night_dive_totals: 31,
        shark_dive_totals: 11,
        wreck_dive_totals: 22,
        drift_dive_totals: 80,
        altitude_dive_totals: 45,
        tech_dive_totals: 14,
        photography: false,
        active_efr: true,
        active_O2: true,
        active_dm: true,
        active_instructor: true
    }
]

module.exports = userData
