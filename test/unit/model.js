var rewire = require('rewire'),
  model = rewire('../../app/scripts/model'),
  utils = model.utils,
  expect = require('chai').expect,
  sinon = require('sinon');

describe.only('#Model Module', function () {
  var sandbox = sinon.sandbox.create(),
    fakeCellConstructor,
    fakeCell;

  fakeCell = {
    setToFixedCell: sandbox.stub(),
    state: null,
    setValue: sandbox.stub()
  };

  beforeEach(function () {
    fakeCellConstructor = sandbox.stub().returns(fakeCell);
    model.__set__({
      Cell: fakeCellConstructor
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('#createCells', function () {
    var fakeGame = {key: 'value'},
      fakeDifficulty = 2,
      fakeGrid = [
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

    sandbox.stub(utils, 'copyGrid');
    sandbox.stub(utils, 'shuffleGrid').returns(fakeGrid);
    sandbox.stub(utils, 'generateEmptyCells');

    model.createCells(fakeGame, fakeDifficulty);

    expect(utils.copyGrid.called).to.be.true;
    expect(utils.generateEmptyCells.called).to.be.true;
    expect(utils.shuffleGrid.called).to.be.true;
    expect(fakeCell.setToFixedCell.callCount).to.be.equal(81);
    expect(fakeCellConstructor.callCount).to.be.equal(81);
  });

  it('#showSolution', function () {
    fakeCell.state = 'empty';
    model.showSolution();

    expect(fakeCell.setValue.callCount).to.be.equal(81);
  });
});
