const { User } = require('../models')
const userData = [
    {
        username: 'example_1',
        email: 'diver1@gmail.com',
        password: 'password',
        certifications: 'Open Water',
        gas_mixes: 'Air',
        ow_dive_totals: 33,
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
        certifications: 'Advanced Open Water Rescue',
        gas_mixes: 'Nitrox Air',
        ow_dive_totals: '112',
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
        certifications: 'Open Water Advanced Open Water Master Rescue Instructor',
        gas_mixes: 'Nitrox Air',
        ow_dive_totals: 200,
        photography: false,
        active_efr: true,
        active_O2: true,
        active_dm: true,
        active_instructor: true
    }
]
module.exports = userData