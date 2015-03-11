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


function NumSelector (game) {
  var padNumbers = $('#numSelector padNumber'),
    padCancel = $('#numSelector padCancel');

  this.game = game;
  this.element = $('#numSelector');
  this.mask = $('#selectorMask');
  utils.setupListeners(padNumbers, padCancel, game);
}

NumSelector.prototype.show = function () {
  this.mask.show();
  this.element.fadeIn(100);
};

NumSelector.prototype.hide = function () {
  this.element.fadeOut(100, function () {
    this.mask.hide();
  }.bind(this));
};

module.exports = function (game) {
  return new NumSelector(game);
}
