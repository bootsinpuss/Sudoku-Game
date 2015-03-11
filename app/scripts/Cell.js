var utils = {
  createCell: function (position) {
    var element = $('<td id="c' + position.x + 'x' + position.y '" class="emptyCell"></td>'),
      rows = $('#game-table tr');
    element.appendTo(rows.eq(position.x));
    return element;
  }
};

function Cell (position, game) {
  this.val = 0;
  this.position = position;
  this.state = false;
  this.element = utils.createCell(position);
  this.game = game;
}

Cell.prototype.setToFixedCell = function(value) {
  this.val = value;
  this.addClass('fixedCell');
};

Cell.prototype.setToEmptyCell = function(value) {
  var game = this.game,
    self = this;
  this.addClass('emptyCell');
  this.element.on('click', function () {
    game.selectedCell = self;
    game.showNumberSelector();
  });
};

Cell.prototype.setValue = function(value) {
  this.val = value;
  this.element.innerHTML = "" + value;
};

module.exports = Cell;
