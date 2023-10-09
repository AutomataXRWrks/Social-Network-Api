const router = require('express').Router();
const userRoutes = require('./userRoute');
const friendRoutes = require('./friendRoutes');
const thoughtRoutes = require('./thoughtRoutes');
//const reactionsRoutes = require('./reactionsRoutes');
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
