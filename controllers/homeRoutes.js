const router = require('express').Router();
const { User } = require('../models');
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
        });

        const user = userData.get({ plain: true });
        console.log(user)
        res.render('profile', {
            user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/search', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render('search')
        };
    } catch (err) {
        res.status(500).json(500)
    };
});

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

// router.get('/matches', async (req, res) => {
//     console.log(req.body)
//     const conditions = {
//         certifications: {
//             [Op.substring]: req.body.certifications,
//         },
//         gas_mixes: {
//             [Op.substring]: req.body.gas_mixes,
//         },
//         ow_dive_totals: {
//             [Op.gte]: parseInt(req.body.ow_dive_totals)
//         },
//     };
//     if (req.body.photography) {
//         conditions.photography = true
//     }
//     if (req.body.active_efr) {
//         conditions.active_efr = true
//     }
//     if (req.body.active_O2) {
//         conditions.active_O2 = true
//     }
//     if (req.body.active_dm) {
//         conditions.active_dm = true
//     }
//     if (req.body.active_instructor) {
//         conditions.active_instructor = true
//     }
//     console.log(conditions)
//     try {
//         // Get all divers that match search criteria
//         const userData = await User.findAll({
//           where: conditions

//         }
//         );
//         const users = userData.map((user) => user.get({ plain: true }));
//     } catch (err) {
//         console.error(err.stack)
//         res.status(500).json(err);
//     }
// });

// router.get('/matches', async, (req, res) => {

// })

module.exports = router;