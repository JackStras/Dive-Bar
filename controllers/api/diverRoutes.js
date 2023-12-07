const router = require('express').Router();
const { User, Threads } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const diverData = await User.findByPk({
            where: {
                id: req.params.id
            },
        });

        res.status(200).json(diverData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Threads.findAll({
            where: {
                user_id: req.params.id
            },
            include: [{
                model: User,
            }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/', async (req, res) => {
    try {
        const postData = await Threads.create(req.body);
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    };
});


module.exports = router;