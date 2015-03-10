function configCellWidth (screenWidth) {
  var fit = Math.floor((screenWidth)/9 - 4);
  $('#game-table td').css({
    width: fit,
    height: fit
  });
}

module.exports = {
  configCellWidth: configCellWidth
};
