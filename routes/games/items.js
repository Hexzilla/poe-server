const v = require('express-validator');
const mongoose = require('mongoose');
const router = require('express').Router();
const Item = mongoose.model('Item');
const auth = require('../auth');
const helper = require('../helper');
const gameSvc = require('../../services/game.service');

// Preload game objects on routes with ':code'
router.param('itemId', function(req, res, next, itemId) {
  Item.findOne({ itemId }).then(function(item) {
      if (!item) { return res.sendStatus(404); }
      req.item = item;
      return next();
    }).catch(next);
});

module.exports = router;
