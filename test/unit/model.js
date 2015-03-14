var rewire = require('rewire'),
  model = rewire('../../app/scripts/model'),
  utils = model.utils,
  expect = require('chai').expect,
  sinon = require('sinon');

function createFakeCells (arr, api) {
  api = api || {};
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var val = arr[i][j];
      arr[i][j] = {
        val: val,
        state: api.state,
        setValue: api.setValue,
        destroy: api.destroy,
        setToEmptyCell: api.setToEmptyCell
      };
    }
  }
  return arr;
}

describe('#Model Module', function () {
  var sandbox = sinon.sandbox.create(),
    fakeCellConstructor,
    revert,
    fakeCell,
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

  beforeEach(function () {
  });

  afterEach(function () {
    sandbox.restore();
    revert();
  });

  describe('#utils', function () {
    it('#shuffleGrid', function () {
      expect(utils.shuffleGrid(fakeGrid)).to.deep.equal(fakeGrid);
    });

    it('#copyGrid', function () {
      revert = model.__set__({
        seedGrid: fakeGrid
      });
      expect(utils.copyGrid()).to.deep.equal(fakeGrid);
      revert();
    });

    it('#generateEmptyCells', function () {
      var setToEmptyCellStub = sandbox.stub();
      utils.generateEmptyCells(
        createFakeCells(fakeGrid, {setToEmptyCell: setToEmptyCellStub}),
        30
      );

      expect(setToEmptyCellStub.callCount).to.equal(30);
    });
  });

  it('#createCells', function () {
    var fakeCell = {
      setToFixedCell: sandbox.stub(),
      state: null,
      setValue: sandbox.stub(),
      val: 0
    };
    var fakeCellConstructor = sandbox.stub().returns(fakeCell);

    revert = model.__set__({
      Cell: fakeCellConstructor
    });
    var fakeGame = {key: 'value'},
      fakeDifficulty = 2;

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
    var setValueStub = sandbox.stub();
    revert = model.__set__({
      cells: createFakeCells([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8]
      ], {state:'empty', setValue: setValueStub})
    });
    model.showSolution();

    expect(setValueStub.callCount).to.be.equal(81);
  });

  it('#resetCells', function () {
    var setValueStub = sandbox.stub();
    revert = model.__set__({
      cells: createFakeCells([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8]
      ], {state: 'filled', setValue: setValueStub})
    });
    model.resetCells();

    expect(setValueStub.callCount).to.be.equal(81);
    expect(setValueStub.calledWith(0)).to.be.true;
  });

  it('#destroyCells', function () {
    var destroyStub = sandbox.stub();
    revert = model.__set__({
      cells: createFakeCells([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8]
      ], {destroy: destroyStub})
    });
    model.destroyCells();

    expect(destroyStub.callCount).to.be.equal(81);
  });

  describe('#isValidFill', function () {
    afterEach(function () {
      revert();
    });

    it('column invalid', function  () {
      revert = model.__set__({
        cells: createFakeCells([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [4, 5, 6, 7, 8, 9, 1, 2, 3],
          [7, 8, 9, 0, 2, 3, 4, 0, 6],
          [2, 3, 4, 5, 6, 7, 8, 9, 1],
          [0, 6, 7, 8, 9, 1, 2, 3, 4],
          [8, 9, 1, 2, 3, 4, 5, 6, 7],
          [5, 4, 5, 6, 7, 8, 9, 1, 2],
          [6, 7, 8, 9, 1, 2, 3, 4, 5],
          [9, 1, 2, 3, 4, 5, 6, 7, 8]
        ])
      });
      expect(model.isValidFill(3,0,5)).to.be.false;
    });

    it('row invalid', function  () {
      revert = model.__set__({
        cells: createFakeCells([
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [4, 5, 6, 7, 8, 9, 1, 2, 3],
          [7, 8, 1, 0, 2, 0, 4, 5, 6],
          [2, 3, 4, 5, 6, 7, 8, 9, 1],
          [0, 6, 7, 8, 9, 1, 2, 3, 4],
          [8, 9, 1, 2, 3, 4, 5, 6, 7],
          [0, 4, 5, 6, 7, 8, 9, 1, 2],
          [6, 7, 8, 9, 1, 2, 3, 4, 5],
          [9, 1, 2, 3, 4, 5, 6, 7, 8]
        ])
      });
      expect(model.isValidFill(2,3,1)).to.be.false;
    });

    it('subarea invalid', function  () {
      revert = model.__set__({
        cells: createFakeCells([
          [1, 2, 3, 4, 5, 3, 7, 8, 9],
          [4, 5, 6, 7, 8, 9, 1, 2, 3],
          [7, 8, 1, 0, 2, 0, 4, 5, 6],
          [2, 3, 4, 5, 6, 7, 8, 9, 1],
          [0, 6, 7, 8, 9, 1, 2, 3, 4],
          [8, 9, 1, 2, 3, 4, 5, 6, 7],
          [0, 4, 5, 6, 7, 8, 9, 1, 2],
          [6, 7, 8, 9, 1, 2, 3, 4, 5],
          [9, 1, 2, 0, 4, 5, 6, 7, 8]
        ])
      });
      expect(model.isValidFill(2,3,3)).to.be.false;
    });

    it('valid', function  () {
      revert = model.__set__({
        cells: createFakeCells([
          [1, 2, 0, 4, 5, 3, 7, 8, 9],
          [4, 5, 6, 7, 8, 9, 1, 2, 3],
          [7, 8, 0, 0, 2, 0, 4, 5, 6],
          [2, 3, 4, 5, 6, 7, 8, 9, 1],
          [0, 6, 7, 8, 9, 1, 2, 3, 4],
          [8, 9, 1, 2, 3, 4, 5, 6, 7],
          [0, 4, 5, 6, 7, 8, 9, 1, 2],
          [6, 7, 8, 9, 1, 2, 3, 4, 5],
          [9, 1, 2, 0, 4, 5, 6, 7, 8]
        ])
      });
      expect(model.isValidFill(2,2,3)).to.be.true;
    });
  });
});
