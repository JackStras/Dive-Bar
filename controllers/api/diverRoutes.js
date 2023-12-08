const router = require('express').Router();
const { User, Threads } = require('../../models');
const { Op } = require('sequelize')
const withAuth = require('../../utils/auth');

router.get('/matching', async (req, res) => {
    try {
        console.log(123)
        // Get all divers that match search criteria
        const userData = await User.findAll({
            where: {
                id: {
                    [Op.ne]: req.session.user_id
                },
                certifications: 'OWD',
                gas_mixes: req.body.gas_mixes,
                ow_dive_totals: {
                    [Op.gte]: req.body.ow_dive_total
                },
                deep_dive_totals: {
                    [Op.gte]: req.body.deep_dive_totals
                },
                cave_dive_totals: {
                    [Op.gte]: req.body.cave_dive_totals
                },
                night_dive_totals: {
                    [Op.gte]: req.body.night_dive_totals
                },
                shark_dive_totals: {
                    [Op.gte]: req.body.shark_dive_totals
                },
                wreck_dive_totals: {
                    [Op.gte]: req.body.wreck_dive_totals
                },
                drift_dive_totals: {
                    [Op.gte]: req.body.drift_dive_totals
                },
                deco_dive_totals: {
                    [Op.gte]: req.body.deco_dive_totals
                },
                ice_dive_totals: {
                    [Op.gte]: req.body.ice_dive_totals
                },
                altitude_dive_totals: {
                    [Op.gte]: req.body.altitude_dive_totals
                },
                drysuit_dive_totals: {
                    [Op.gte]: req.body.drysuit_dive_totals
                },
                tech_dive_totals: {
                    [Op.gte]: req.body.tech_dive_totals
                },
                photography: req.body.photography,
                active_efr: req.body.active_efr,
                active_02: req.body.active_02,
                active_dm: req.body.active_dm,
                active_instructor: req.body.active_instructor,
            },
        },
        );

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: Threads }]
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
        console.log(err.message)
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(123)
        const threadData = await Threads.create(req.body);
        res.status(200).json(threadData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;