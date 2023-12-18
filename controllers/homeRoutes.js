const router = require('express').Router();
const { User, Threads } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

// redner homepage if signed in
router.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.render('homepage');
        } else {
            res.redirect('/profile')
        }
    } catch (err) {
        res.status(500).json(err);
    };
});


// withAuth to prevent access to users profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{model: Threads}],
        });

        const user = userData.get({ plain: true });
        console.log(user)
        // res.status(200).json(user)
        res.render('profile', {
            user,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/search', withAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render('search')
        };
    } catch (err) {
        res.status(500).json(500)
    };
});

router.get('/user_profile/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{model: Threads}],
        })

        const user = userData.get({ plain: true });
        console.log(user)
        res.render('user_profile', {
            user,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/edit', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        })

        const user = userData.get({ plain: true })

        if (req.session.loggedIn) {
            res.render('edit', {
                ...user,
                loggedIn: true
            })
        }
    } catch (err) {
        res.status(500).json(500)
    }
})

router.get('*', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.render('homepage');
        } else {
            res.redirect('/profile')
        }
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;