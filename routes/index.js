const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/user', require('./user'));

module.exports = router;
