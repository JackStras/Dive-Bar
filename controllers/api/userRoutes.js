const router = require('express').Router();
const { User, Threads } = require('../../models');
const withAuth = require('../../utils/auth');
const chalk = require('chalk');

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

router.post('/comments', withAuth, async (req, res) => {
    try {
        const commentData = await Threads.create(req.body,
            {
                attributes: { exclude: ['password'] },
                include: [{ model: User }],
                where: {
                    id: req.body.user_id
                }
            })
            console.log(chalk.green.bold("Comment data retrieved from DB", commentData))
        res.status(200).json(chalk.blue.bold("New thread data", commentData))
    } catch (err) {
        console.log(chalk.red.bold("Error message", err))
        res.status(500).json(err)
    }
})

module.exports = router;