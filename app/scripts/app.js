var layoutHelper = require('./layoutHelper');

function init (argument) {
  var tableWidth = $('#game-table').width();
  layoutHelper.configCellWidth(tableWidth);
  layoutHelper.setupNumberSelectorLayout(tableWidth);
}

$(document).ready(function(){
  init();
});
