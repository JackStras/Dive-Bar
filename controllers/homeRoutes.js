const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email,  please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.email = userData.email;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', withAuth, async (req, res) => {
    console.log('TEST')
    try {
        const userData = await User.update(
            {
                certifications: req.body.certifications,
                gas_mixes: req.body.gas_mixes,
                ow_dive_totals: req.body.ow_dive_totals,
                photography: req.body.photography,
                active_efr: req.body.active_efr,
                active_O2: req.body.active_O2,
                active_dm: req.body.active_dm,
                active_instructor: req.body.active_instructor
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(userData);
        console.log(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

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
//         // res.render('matches', {users})
//     } catch (err) {
//         console.error(err.stack)
//         res.status(500).json(err);
//     }
// });

// module.exports = router;