const router = require('express').Router();
const { User, Threads } = require('../../models');
const { Op } = require('sequelize')
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    const conditions = {
        certifications: {
            [Op.substring]: req.body.certifications,
        },
        gas_mixes: {
            [Op.substring]: req.body.gas_mixes,
        },
        ow_dive_totals: {
            [Op.gte]: parseInt(req.body.ow_dive_totals)
        },
    };
    if (req.body.photography) {
        conditions.photography = true
    }
    if (req.body.active_efr) {
        conditions.active_efr = true
    }
    if (req.body.active_O2) {
        conditions.active_O2 = true
    }
    if (req.body.active_dm) {
        conditions.active_dm = true
    }
    if (req.body.active_instructor) {
        conditions.active_instructor = true
    }
    console.log(conditions)
    try {
        // Get all divers that match search criteria
        const userData = await User.findAll({
          where:  
            conditions
        
    }
        );
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('matches', {users})
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