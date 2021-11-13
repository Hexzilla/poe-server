const v = require('express-validator');
const mongoose = require('mongoose');
const router = require('express').Router();
const Game = mongoose.model('Game');
const auth = require('../auth');
const helper = require('../helper');
const gameSvc = require('../../services/game.service');

// Preload game objects on routes with ':code'
router.param('code', function(req, res, next, code) {
  Game.findOne({ code }).then(function(game) {
      if (!game) { return res.sendStatus(404); }
      req.game = game;
      return next();
    }).catch(next);
});

// Create a new game.
router.post('/',
  auth.required, 
  v.body('code').isString(),
  v.body('title').isString(),
  helper.validate,
  helper.createRouter(async function({ body }) {
    return await gameSvc.createGame(body.code, body.title);
  })
);

// Get a list of games.
router.get('/',
  auth.required, 
  helper.createRouter(async function() {
    return await gameSvc.getGames();
  })
);

// Find a game by code
router.get('/:code',
  auth.required, 
  helper.createRouter(async function({ game }) {
    return { game };
  })
);

// Updade a game information.
router.put('/:code',
  auth.required,
  v.body('code').isString(),
  v.body('title').isString(),
  helper.createRouter(async function({ game, body }) {
    return await gameSvc.updateGame(game, body.code, body.title);
  })
);

// Delete a game by code
router.delete('/:code',
  auth.required, 
  helper.createRouter(async function({ game }) {
    return await gameSvc.deleteGame(game);
  })
);

// Create a new item.
router.post('/:code/items',
  auth.required,
  v.body('name').notEmpty(),
  helper.validate,
  helper.createRouter(async function({ payload, game, body }) {
    return await gameSvc.createItem(payload.id, game, body);
  })
);

router.use('/items', require('./items'))

module.exports = router;
