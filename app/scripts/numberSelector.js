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
  this.element.css({
    left: Math.floor((game.tableElement.width())/4)
  });
  this.padNumbers = padNumbers;
  utils.setupListeners(padNumbers, padCancel, game);
}

NumberSelector.prototype.show = function (valids) {
  for (var i = 1; i <= 9; i++) {
    if (valids[i]) {
      this.padNumbers.eq(i-1).find('div').removeClass('invalid').addClass('valid');
    } else {
      this.padNumbers.eq(i-1).find('div').removeClass('valid').addClass('invalid');
    }
  }
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
