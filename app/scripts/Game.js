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
    difficulty = parseInt(difficultySelector.val()),
    remaining = difficulty;

  model.createCells(game, difficulty, true);

  game.showWinMessage = function () {
    var self = this;
    self.tableElement.fadeOut('fast', function () {
      self.tableElement.fadeIn('fast', function() {
        self.tableElement.addClass('win-table');
      });
    });
  };

  game.selectCell = function (cell) {
    selectedCell = cell;
  };

  game.selectNumber = function (value) {
      var orig = selectedCell.val;
      selectedCell.setValue(value);
      if (orig === 0 && value !== 0) {
        remaining -= 1;
      } else if (orig !== 0 && value === 0) {
        remaining += 1;
      }
      this.hideNumberSelector();
      if (remaining === 0) {
        this.showWinMessage();
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
    self.tableElement.removeClass('win-table');
    self.hideNumberSelector();
    model.destroyCells();
    model.createCells(self, difficulty);
    remaining = difficulty;
    selectedCell = null;
  };

  game.retryGame = function () {
    this.tableElement.removeClass('win-table');
    remaining = difficulty;
    model.resetCells();
  };

  game.showSolution = function () {
    model.showSolution();
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
