const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// redner homepage if signed in
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err);
    };
});

// render matches based on filter preferences
// router.get('/matches', withAuth, async (req, res) => {
//     try {
//         // Get all projects and JOIN with user data
//         const userData = await User.findAll({
//             where: {
//                 attribute: {
//                     $not: req.session.user_id
//                 },
//                 certifications: req.body.certifications,
//                 gas_mixes: req.body.gas_mixes,
//                 ow_dive_totals: req.body.ow_dive_totals,
//                 deep_dive_totals: req.body.deep_dive_totals,
//                 cave_dive_totals: req.body.cave_dive_totals,
//                 night_dive_totals: req.body.night_dive_totals,
//                 shark_dive_totals: req.body.shark_dive_totals,
//                 wreck_dive_totals: req.body.wreck_dive_totals,
//                 drift_dive_totals: req.body.drift_dive_totals,
//                 deco_dive_totals: req.body.deco_dive_totals,
//                 ice_dive_totals: req.body.ice_dive_totals,
//                 altitude_dive_totals: req.body.altitude_dive_totals,
//                 drysuit_dive_totals: req.body.drysuit_dive_totals,
//                 tech_dive_totals: req.body.tech_dive_totals,
//                 photography: req.body.photography,
//                 active_efr: req.body.active_efr,
//                 active_02: req.body.active_02,
//                 active_dm: req.body.active_dm,
//                 active_instructor: req.body.active_instructor,
//             },
//             include: [
//                 {
//                     model: User,
//                 },
//             ],
//         });

//         // Serialize data so the template can read it
//         const users = userData.map((matches) => matches.get({ plain: true }));

//         // Pass serialized data and session flag into template
//         res.render('matches', {
//             users,
//             loggedIn: req.session.loggedIn
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// withAuth to prevent access to users profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
