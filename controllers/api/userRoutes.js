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
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
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
    try {
        const userData = await User.update(req.body,
            {
                where: {
                    id: req.params.id
                },
                certifications: req.body.certificationsVal,
                gas_mixes: req.body.gas_mixesVal,
                ow_dive_totals: req.body.ow_dive_totalsVal,
                deep_dive_totals: req.body.deep_dive_totalsVal,
                cave_dive_totals: req.body.cave_dive_totalsVal,
                night_dive_totals: req.body.night_dive_totalsVal,
                shark_dive_totals: req.body.shark_dive_totalsVal,
                wreck_dive_totals: req.body.wreck_dive_totalsVal,
                drift_dive_totals: req.body.drift_dive_totalsVal,
                altitude_dive_totals: req.body.altitude_dive_totalsVal,
                tech_dive_totals: req.body.tech_dive_totalsVal,
                photography: req.body.photographyVal,
                active_efr: req.body.active_efrVal,
                active_O2: req.body.active_O2Val,
                active_dm: req.body.active_dmVal,
                active_instructor: req.body.active_instructorVal
            },
        );
        res.status(200).json(userData);
    } catch(err) {
        res.status(500).json(err)
    }



})

module.exports = router;