const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/user', require('./user'));
router.use('/game', require('./game'));

module.exports = router;
