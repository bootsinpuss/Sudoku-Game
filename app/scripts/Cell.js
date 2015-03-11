var utils = {
  createCell: function (position) {
    var element = $('<td id="c' + position.x + 'x' + position.y '" class="emptyCell"></td>'),
      rows = $('#game-table tr');
    element.appendTo(rows.eq(position.x));
    return element;
  }
};

function Cell (position, value, game) {
  this.val = value;
  this.position = position;
  this.element = utils.createCell(position);
  this.game = game;
}

Cell.prototype.setToFixedCell = function(value) {
  this.val = value;
  this.addClass('fixedCell');
};

Cell.prototype.setToEmptyCell = function() {
  var game = this.game,
    self = this;

  self.val = 0;
  self.addClass('emptyCell');
  self.element.on('click', function () {
    game.selectCell(self);
    game.showNumberSelector();
  });
};

Cell.prototype.setValue = function(value) {
  this.val = value;
  this.element.innerHTML = "" + value == 0 ? "" : value;
};

module.exports = Cell;
