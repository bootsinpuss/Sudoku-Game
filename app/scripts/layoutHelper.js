function configCellWidth (tableWidth) {
  var fit = Math.floor((tableWidth)/9 - 4);
  $('#game-table td').css({
    width: fit,
    height: fit
  });
}

function setupNumberSelectorLayout (tableWidth) {
  var fit = Math.floor((tableWidth)/4);
  $('#numSelector').css({
    left: fit
  });
}

module.exports = {
  configCellWidth: configCellWidth,
  setupNumberSelectorLayout: setupNumberSelectorLayout
};
