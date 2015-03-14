var utils = {
  createCell: function (position, game) {
    var element = $('<td></td>'),
      rows = game.tableElement.find('tr'),
      tableWidth = game.tableElement.width(),
      cellWidth = Math.floor((tableWidth)/9 - 4);

    element
    .css({
      width: cellWidth,
      height: cellWidth
    })
    .appendTo(rows.eq(position.x));

    return element;
  }
};

function Cell (position, game) {
  this.val = 0;
  this.position = position;
  this.element = utils.createCell(position, game);
  this.game = game;
  this.state = 'empty';
}

Cell.prototype.setToFixedCell = function(value) {
  this.setValue(value);
  this.state = 'fixed';
  this.element.addClass('fixedCell').removeClass('emptyCell');
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
  this.element.html("" + (value === 0 ? "" : value));
  this.state = value === 0 ? 'empty' : 'filled';
};

Cell.prototype.destroy = function () {
  this.element.remove();
};

module.exports = {
  Cell: Cell,
  utils: utils // for test purpose
};
