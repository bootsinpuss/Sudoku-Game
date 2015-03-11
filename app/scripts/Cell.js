var utils = {
  createCell: function (position) {
    var element = $('<td id="c' + position.x + 'x' + position.y + '"></td>'),
      rows = $('#game-table tr');
    element.appendTo(rows.eq(position.x));
    return element;
  }
};

function Cell (position, game) {
  this.val = 0;
  this.position = position;
  this.element = utils.createCell(position);
  this.game = game;
}

Cell.prototype.setToFixedCell = function(value) {
  this.setValue(value);
  this.element.addClass('fixedCell');
};

Cell.prototype.setToEmptyCell = function() {
  var game = this.game,
    self = this;

  self.setValue(0);
  self.element.addClass('emptyCell').removeClass('fixedCell');
  self.element.on('click', function () {
    game.selectCell(self);
    game.showNumberSelector();
  });
};

Cell.prototype.setValue = function(value) {
  this.val = value;
  this.element.html("" + value == 0 ? "" : value);
};

module.exports = Cell;
