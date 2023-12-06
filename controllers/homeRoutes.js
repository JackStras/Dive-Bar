const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// redner homepage if signed in
router.get('/', withAuth, async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// render matches based on filter preferences
router.get('/matches', withAuth, async (req, res) => {
    try {
        // Get all profiles that match filter criteria
        const userData = await User.findAll({
            where: {
                certifications: req.params.certifications,
                gas_mixes: req.params.gas_mixes,
                ow_dive_totals: req.params.ow_dive_totals,
                deep_dive_totals: req.params.deep_dive_totals,
                cave_dive_totals: req.params.cave_dive_totals,
                night_dive_totals: req.params.night_dive_totals,
                shark_dive_totals: req.params.shark_dive_totals,
                wreck_dive_totals: req.params.wreck_dive_totals,
                drift_dive_totals: req.params.drift_dive_totals,
                deco_dive_totals: req.params.deco_dive_totals,
                ice_dive_totals: req.params.ice_dive_totals,
                altitude_dive_totals: req.params.altitude_dive_totals,
                drysuit_dive_totals: req.params.drysuit_dive_totals,
                tech_dive_totals: req.params.tech_dive_totals,
                photography: req.params.photography,
                active_efr: req.params.active_efr,
                active_02: req.params.active_02,
                active_dm: req.params.active_dm,
                active_instructor: req.params.active_instructor,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        // Serialize data so the template can read it
        const users = userData.map((matches) => matches.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('matches', {
            users,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// withAuth to prevent access to users profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
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
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
