const router = require('express').Router();
const userRoutes = require('./usersRoute');
const friendRoutes = require('./friendsRoutes');
const toughtsRoutes = require('./toughtsRoutes');
//const reactionsRoutes = require('./reactionsRoutes');
router.use('/users', userRoutes);
//router.use('/toughts', friendRoutes);

module.exports = router;
