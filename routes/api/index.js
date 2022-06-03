// EXPRESS
const router = require('express').Router();

// ROUTES FOR USER / THROUGHTS 
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thoughts-routes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;