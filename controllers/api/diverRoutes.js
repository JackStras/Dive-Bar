const router = require('express').Router();
const { User, Threads } = require('../../models');
const { Op } = require('sequelize')
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        // Get all divers that match search criteria
        const userData = await User.findAll({
            where: {
                id: {
                    [Op.ne]: req.session.user_id
                },
                certifications: {
                    [Op.substring]: req.body.certifications,
                },
                gas_mixes: {
                    [Op.substring]: req.body.gas_mixes,
                },
                ow_dive_totals: {
                    [Op.gte]: parseInt(req.body.ow_dive_totals)
                },
                photography: req.body.photography,
                active_efr: req.body.active_efr,
                active_O2: req.body.active_O2,
                active_dm: req.body.active_dm,
                active_instructor: req.body.active_instructor
            },
        },
        );

        res.status(200).json(userData);
        res.redirect('/matches')
    } catch (err) {
        console.error(err.stack)
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: Threads }]
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const threadData = await Threads.create(req.body);
        res.status(200).json(threadData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;