const router = require('express').Router();
const { User } = require('../../models');


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

router.put('/:id', async (req, res) => {
    console.log('TEST')
    try {
        const userData = await User.update(
            {
                certifications: req.body.certificationsVal,
                gas_mixes: req.body.gas_mixesVal,
                ow_dive_totals: req.body.ow_dive_totalsVal,
                photography: req.body.photographyVal,
                active_efr: req.body.active_efrVal,
                active_O2: req.body.active_O2Val,
                active_dm: req.body.active_dmVal,
                active_instructor: req.body.active_instructorVal
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

module.exports = router;