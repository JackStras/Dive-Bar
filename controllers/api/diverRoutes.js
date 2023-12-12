const router = require('express').Router();
const { User, Threads } = require('../../models');
const { Op } = require('sequelize')
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        // Get all divers that match search criteria
        const userData = await User.findAll({
            where: {
                id: {
                    [Op.ne]: req.session.user_id
                },
                certifications: {
                    [Op.substring]: req.body.certificationsVal,
                },
                gas_mixes: {
                    [Op.substring]: req.body.gas_mixesVal,
                },
                dive_totals: {
                    [Op.gte]: parseInt(req.body.ow_dive_totalsVal)
                },
                photography: req.body.photographyVal,
                active_efr: req.body.active_efrVal,
                active_02: req.body.active_O2Val,
                active_dm: req.body.active_dmVal,
                active_instructor: req.body.active_instructorVal,
            },
        },
        );

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/search', withAuth, async (req, res) => {
    try {
        res.render
    } catch(err) {
        res.status(500).json(err)
    }
})

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