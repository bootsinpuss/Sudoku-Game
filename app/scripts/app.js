var layoutHelper = require('./layoutHelper'),
  gameModule = require('./game'),
  numberSelectorModule = require('./numberSelector');

function init (argument) {
  var tableWidth = $('#game-table').width();
  layoutHelper.setupNumberSelectorLayout(tableWidth);
}

function setupButtonHandlers (game) {
  $('#reset-game').on('click', function () {
    game.reset();
  });
}

$(document).ready(function(){
  var game = gameModule.gameFactory(2);

  init();
  setupButtonHandlers(game);
});
