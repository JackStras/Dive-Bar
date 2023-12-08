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

router.get('/search', async (req,res) => {
    try {
        if (req.session.loggedIn) {
            res.render('search')
        };
    } catch (err) {
        res.status(500).json(500)
    };
});
