const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Item = mongoose.model('Item');

module.exports = {
  createGame: async function(code, title) {
    const game = new Game({ code, title });
    const saved = await game.save();
    return { game: saved };
  },

  getGames: async function() {
    const games = await Game.find({});
    return { games }
  },

  updateGame: async function(game, code, title) {
    game.code = code;
    game.title = title;
    const saved = await game.save();
    return { game: saved };
  },

  deleteGame: async function(game) {
    return {
      game: await game.delete()
    }
  },

  createItem: async function(userId, game, data) {
    const item = new Item({
      userId,
      gameId: game.id,
      ...data
    });
    const saved = await item.save();
    return { item: item.id };
  },
};