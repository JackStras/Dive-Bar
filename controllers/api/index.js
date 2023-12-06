const router = require('express').Router();
const userRoutes = require('./userRoutes');
const diverRoutes = require('./diverRoutes')

router.use('/users', userRoutes);
router.use('/divers', diverRoutes)

module.exports = router;