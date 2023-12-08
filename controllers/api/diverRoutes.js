const router = require('express').Router();
const { User, Threads } = require('../../models');
const { Op } = require('sequelize')
const withAuth = require('../../utils/auth');

router.get('/matching', async (req, res) => {
    try {
        console.log(req.query)
        // Get all divers that match search criteria
        const userData = await User.findAll({
            where: {
                id: {
                    [Op.ne]: req.query.user_id
                },
                certifications: {
                    [Op.substring]: req.query.certifications,
                },
                gas_mixes: {
                    [Op.substring]: req.query.gas_mixes,
                },
                ow_dive_totals: {
                    [Op.gte]: parseInt(req.query.ow_dive_totals)
                },
                deep_dive_totals: {
                    [Op.gte]: parseInt(req.query.deep_dive_totals)
                },
                cave_dive_totals: {
                    [Op.gte]: parseInt(req.query.cave_dive_totals)
                },
                night_dive_totals: {
                    [Op.gte]: parseInt(req.query.night_dive_totals)
                },
                shark_dive_totals: {
                    [Op.gte]: parseInt(req.query.shark_dive_totals)
                },
                wreck_dive_totals: {
                    [Op.gte]: parseInt(req.query.wreck_dive_totals)
                },
                drift_dive_totals: {
                    [Op.gte]: parseInt(req.query.drift_dive_totals)
                },
                altitude_dive_totals: {
                    [Op.gte]: parseInt(parseIntreq.query.altitude_dive_totals)
                },
                tech_dive_totals: {
                    [Op.gte]: parseInt(req.query.tech_dive_totals)
                },
                photography: req.query.photography,
                active_efr: req.query.active_efr,
                active_02: req.query.active_02,
                active_dm: req.query.active_dm,
                active_instructor: req.query.active_instructor,
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