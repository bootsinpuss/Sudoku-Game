var Cell = require('./Cell').Cell;

var seedGrid = [
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

var gameGrid = [
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

var cells;

var utils = {
  shuffleGrid: function (grid) {
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

  generateEmptyCells: function (cells, difficulty) {
    var index,
      x,
      y;
    while (difficulty > 0) {
      index = Math.floor(Math.random() * 81);
      x = Math.floor(index/9);
      y = Math.floor(index%9);
      if (cells[x][y].val !== 0) {
        cells[x][y].setToEmptyCell();
        difficulty--;
      }
    }
  },

  copyGrid: function () {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        gameGrid[i][j] = seedGrid[i][j];
      }
    }
    return gameGrid;
  }
}

function destroyCells () {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      cells[i][j].destroy();
    }
  }
}

function resetCells () {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (cells[i][j].state === 'filled') {
        cells[i][j].setValue(0);
      }
    }
  }
}

function isValidFill (x, y, value) {
  var copy = cells[x][y].val,
    set = {},
    i,
    j,
    subX,
    subY;

  var check = function (value) {
    if (value === 0) {
      return true;
    }
    if (set[value]) {
      cells[x][y].val = copy;
      return false;
    }
    set[value] = true;
    return true;
  };

  cells[x][y].val = value;
  for (i = 0; i < 9; i++) {
    if(!check(cells[i][y].val)) {
      return false;
    }
  }

  set = {};
  for (i = 0; i < 9; i++) {
    if(!check(cells[x][i].val)) {
      return false;
    }
  }

  set = {};
  subX = Math.floor(x/3)*3;
  subY = Math.floor(y/3)*3;
  for (i = subX; i < subX + 3; i++) {
    for (j = subY; j < subY + 3; j++) {
      if(!check(cells[i][j].val)) {
        return false;
      }
    }
  }
  cells[x][y].val = copy;
  return true;
}

function showSolution (argument) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (cells[i][j].state === 'empty') {
        cells[i][j].setValue(gameGrid[i][j]);
      }
    }
  }
}

function createCells (game, difficulty) {
  var grid = utils.copyGrid();
  grid = utils.shuffleGrid(grid);

  cells = [];
  for (var i = 0; i < 9; i++) {
    var columns = [];
    for (var j = 0; j < 9; j++) {
      columns[j] = new Cell({
        x: i,
        y: j
      }, game);
      columns[j].setToFixedCell(grid[i][j]);
    }
    cells[i] = columns;
  }

  utils.generateEmptyCells(cells, difficulty);
  return cells;
}

module.exports = {
  createCells: createCells,
  resetCells: resetCells,
  destroyCells: destroyCells,
  isValidFill: isValidFill,
  showSolution: showSolution,
  utils: utils // for testing purpose
};
