var numberSelectorSingleton = null;

var utils = {
  setupListeners: function (padNumbers, padCancel, game) {

    padNumbers.each(function (index) {
      $(this).on('click', function () {
        game.selectNumber(index + 1);
      });
    });

    padCancel.on('click', function () {
      game.selectNumber(0);
    });
  }
};


function NumberSelector (game) {
  var padNumbers = $('#numSelector .padNumber'),
    padCancel = $('#numSelector .padCancel');

  this.game = game;
  this.element = $('#numSelector');
  utils.setupListeners(padNumbers, padCancel, game);
}

NumberSelector.prototype.show = function () {
  this.element.show();
};

NumberSelector.prototype.hide = function () {
  this.element.hide();
};

module.exports = {
  numberSelectorFactory: function (game) {
    if (numberSelectorSingleton === null) {
      numberSelectorSingleton = new NumberSelector(game);
    }
    return numberSelectorSingleton;
  }
};
