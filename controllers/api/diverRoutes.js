const router = require('express').Router();
const { User } = require('../../models');
const { Threads } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
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

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Threads.findAll()
        res.status(200).json(postData);
    } catch(err) {
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