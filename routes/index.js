// EXPRESS
const router = require('express').Router();

// IMPORT ALL ROUTES
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// ERROR MESSAGE
router.use((req, res) => {
    res.status(404).send('<h1>404 ERROR!</h1>');
});

module.exports = router;