var Cell = require('./Cell');

var solutionGrid = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8]
];

var utils = {

  shuffle: function (grid) {
    var i, j, k, temp, col, col1, col2,
    row1, row2, sub, sub1, sub2, num1, num2;

    //swap the same columns of each subsquare
    for(i = 0; i < 25; i++) {
      col = Math.floor(Math.random()*3);
      sub1 = Math.floor(Math.random()*3);
      sub2 = Math.floor(Math.random()*3);
      for(j = 0; j < grid.length; j++) {
        temp = grid[j][col + sub1*3];
        grid[j][col + sub1*3] = grid[j][col + sub2*3];
        grid[j][col + sub2*3] = temp;
      }
    }

    //swap all columns within each subsquare
    for(i = 0; i < 25; i++) {
      sub = Math.floor(Math.random()*3);
      col1 = Math.floor(Math.random()*3);
      col2 = Math.floor(Math.random()*3);
      while(col1 == col2) col2 = Math.floor(Math.random()*3);
      for(j = 0; j < grid.length; j++) {
        temp = grid[j][sub*3 + col1];
        grid[j][sub*3 + col1] = grid[j][sub*3 + col2];
        grid[j][sub*3 + col2] = temp;
      }
    }

    //swap all rows within each subsquare
    for(i = 0; i < 25; i++) {
      sub = Math.floor(Math.random()*3);
      row1 = Math.floor(Math.random()*3);
      row2 = Math.floor(Math.random()*3);
      while(row1 == row2) row2 = Math.floor(Math.random()*3);
      for(j = 0; j < grid.length; j++) {
        temp = grid[sub*3 + row1][j];
        grid[sub*3 + row1][j] = grid[sub*3 + row2][j];
        grid[sub*3 + row2][j] = temp;
      }
    }

    //swap one number with another
    for(i = 0; i < 25; i++) {
      num1 = Math.floor(Math.random()*9 + 1);
      num2 = Math.floor(Math.random()*9 + 1);
      while(num1 == num2) num2 = Math.floor(Math.random()*9 + 1);
      for(j = 0; j < grid.length; j++) {
        for(k = 0; k < grid[j].length; k++) {
          if(grid[j][k] == num1)
            grid[j][k] = num2;
          else if(grid[j][k] == num2)
            grid[j][k] = num1;
        }
      }
    }

    return grid;
  },

  fillFixedCells: function (cells, count) {
    var index;
    while (count > 0) {
      index = Math.floor(Math.ramdon() * 81);
      cells[index/9][index%9].setToEmptyCell();
      count--;
    }
  },

  createCells: function (grid) {
    var arr = [];
    for (var i = 0; i < 9; i++) {
      var columns = [];
        for (var j = 0; j < 9; j++) {
          columns[j] = new Cell({
            x: i,
            y: j
          }, grid[i][j], game);
        }
      }
      arr[i] = columns;
    }
    return arr;
};


function createGame (difficulty) {
  solutionGrid = utils.shuffle(solutionGrid);
  var cells = utils.createCells(solutionGrid),
    game = {},
    selectedCell = null;

  utils.fillFixedCells(cells, difficulty * 15);

  game.selectCell = function (cell) {
    selectedCell = cell;
  };

  game.showNumberSelector = function () {
    $('#numSelector').fadeOut(100);
  };

  return game;
}

module.exports = {

};
