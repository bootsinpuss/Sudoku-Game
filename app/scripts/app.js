var layoutHelper = require('./layoutHelper'),
  gameModule = require('./game'),
  numberSelectorModule = require('./numberSelector');

function init (argument) {
  var tableWidth = $('#game-table').width();
  layoutHelper.configCellWidth(tableWidth);
  layoutHelper.setupNumberSelectorLayout(tableWidth);
}

$(document).ready(function(){
  var game = gameModule.gameFactory(2),
   numberSelector = numberSelectorModule.numberSelectorFactory(game);

  init();
});
