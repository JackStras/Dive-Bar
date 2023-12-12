const router = require('express').Router();
const { User, Threads } = require('../../models');
const { Op } = require('sequelize')
const withAuth = require('../../utils/auth');

router.get('/matching', withAuth, async (req, res) => {
    try {
        // Get all divers that match search criteria
        const userData = await User.findAll({
            where: {
                id: {
                    [Op.ne]: req.query.user_id
                },
                certifications: {
                    [Op.substring]: certificationsVal,
                },
                gas_mixes: {
                    [Op.substring]: gas_mixesVal,
                },
                ow_dive_totals: {
                    [Op.gte]: parseInt(ow_dive_totalsVal)
                },
                deep_dive_totals: {
                    [Op.gte]: parseInt(deep_dive_totalsVal)
                },
                cave_dive_totals: {
                    [Op.gte]: parseInt(cave_dive_totalsVal)
                },
                night_dive_totals: {
                    [Op.gte]: parseInt(night_dive_totalsVal)
                },
                shark_dive_totals: {
                    [Op.gte]: parseInt(shark_dive_totalsVal)
                },
                wreck_dive_totals: {
                    [Op.gte]: parseInt(wreck_dive_totalsVal)
                },
                drift_dive_totals: {
                    [Op.gte]: parseInt(drift_dive_totalsVal)
                },
                altitude_dive_totals: {
                    [Op.gte]: parseInt(altitude_dive_totalsVal)
                },
                tech_dive_totals: {
                    [Op.gte]: parseInt(tech_dive_totalsVal)
                },
                photography: photographyVal,
                active_efr: active_efrVal,
                active_02: active_O2Val,
                active_dm: active_dmVal,
                active_instructor: active_instructorVal,
            },
        },
        );

        res.status(200).json(userData);
    } catch (err) {
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