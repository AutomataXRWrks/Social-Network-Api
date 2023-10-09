const router = require('express').Router();
const userRoutes = require('./userRoute');
const friendRoutes = require('./friendRoutes');
const toughtRoutes = require('./toughtRoutes');
//const reactionsRoutes = require('./reactionsRoutes');
router.use('/users', userRoutes);
//router.use('/toughts', friendRoutes);

module.exports = router;
