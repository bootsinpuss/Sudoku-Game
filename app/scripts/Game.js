var numberSelectorModule = require('./numberSelector'),
  model = require('./model'),
  gameSingleton = null;



function createGame () {
  var game = {
    tableElement: $('#game-table')
  };

  var selectedCell = null,
    numSelector = numberSelectorModule.numberSelectorFactory(game),
    difficultySelector = $('#difficulty'),
    difficulty = parseInt(difficultySelector.val());

  model.createCells(game, difficulty, true);

  game.selectCell = function (cell) {
    selectedCell = cell;
  };

  game.selectNumber = function (value) {
    if (selectedCell !== null) {
      selectedCell.setValue(value);
      this.hideNumberSelector();
    }
  };

  game.setNumberSelector = function (element) {
    numSelector = element;
  };

  game.showNumberSelector = function () {
    var valids = {},
      pos = selectedCell.position;

    for (var i = 1; i <= 9; i++) {
      if (model.isValidFill(pos.x, pos.y, i)) {
        valids[i] = true;
      }
    }
    numSelector.show(valids);
  };

  game.hideNumberSelector = function () {
    numSelector.hide();
  };

  game.setDifficulty = function () {
    difficulty = parseInt(difficultySelector.val());
    this.resetGame();
  };

  game.resetGame = function () {
    var self = this;
    self.hideNumberSelector();
    model.destroyCells();
    model.createCells(self, difficulty);
    selectedCell = null;
  };

  game.retryGame = function () {
    model.resetCells();
  };

  return game;
}

module.exports = {
  gameFactory: function () {
    if (gameSingleton === null) {
      gameSingleton = createGame();
    }
    return gameSingleton;
  }
};
