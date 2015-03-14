var rewire = require('rewire'),
  game = rewire('../../app/scripts/game'),
  expect = require('chai').expect,
  sinon = require('sinon');

describe('#Game Module', function () {
  var sandbox = sinon.sandbox.create(),
    revert,
    testGame,
    numberSelectorModuleStub,
    showStub,
    hideStub,
    destroyCellsStub,
    showSolutionStub,
    resetCellsStub,
    isValidFillStub,
    createCellsStub;

  before(function () {
    createCellsStub = sandbox.stub();
    isValidFillStub = sandbox.stub();
    showStub = sandbox.stub();
    hideStub = sandbox.stub();
    resetCellsStub = sandbox.stub();
    showSolutionStub = sandbox.stub();
    destroyCellsStub = sandbox.stub();
    numberSelectorModuleStub = sandbox.stub().returns({
      show: showStub,
      hide: hideStub
    });
    revert = game.__set__({
      model: {
        createCells: createCellsStub,
        isValidFill: isValidFillStub,
        destroyCells: destroyCellsStub,
        resetCells: resetCellsStub,
        showSolution: showSolutionStub
      },
      '$': function () {
        return {
          val: function () {
            return 1;
          }
        }
      },
      numberSelectorModule: {
        numberSelectorFactory: numberSelectorModuleStub
      }
    });
    testGame = game.gameFactory();
  });

  after(function () {
    // revert();
    sandbox.restore();
  });

  it('Singleton', function () {
    testGame = game.gameFactory();
    testGame = game.gameFactory();
    testGame = game.gameFactory();
    testGame = game.gameFactory();

    expect(createCellsStub.callCount).to.equal(1);
    expect(numberSelectorModuleStub.callCount).to.equal(1);
  });

  describe('#selectNumber', function () {
    var fakeCell = {
      setValue: function () {}
    };

    beforeEach(function () {
      sandbox.stub(testGame, 'hideNumberSelector');
      sandbox.stub(testGame, 'showWinMessage');
      sandbox.stub(fakeCell, 'setValue');
    });

    afterEach(function () {
      testGame.hideNumberSelector.restore();
      testGame.showWinMessage.restore();
      fakeCell.setValue.restore();
    });

    it('from empty to value', function  () {
      fakeCell.val = 0;
      testGame.selectCell(fakeCell);
      testGame.selectNumber(2);

      expect(fakeCell.setValue.calledWith(2));
      expect(testGame.getRemaining()).to.equal(0);
      expect(testGame.hideNumberSelector.called).to.be.true;
      expect(testGame.showWinMessage.called).to.be.true;
    });

    it('from value to empty', function  () {
      fakeCell.val = 2;
      testGame.selectCell(fakeCell);
      testGame.selectNumber(0);

      expect(testGame.getRemaining()).to.equal(1);
      expect(testGame.hideNumberSelector.called).to.be.true;
      expect(testGame.showWinMessage.called).to.be.false;
    });
  });

  it('#showNumberSelector', function () {
    var fakeCell = {
      position: {
        x: 3,
        y: 4
      }
    };
    testGame.selectCell(fakeCell);
    testGame.showNumberSelector();

    expect(isValidFillStub.callCount).to.equal(9);
    expect(isValidFillStub.calledWith(3,4)).to.be.true;
    expect(showStub.called).to.be.true;
  });

  it('#hideNumberSelector', function () {
    testGame.hideNumberSelector();
    expect(hideStub.called).to.be.true;
  });

  it('#setDifficulty', function () {
    sandbox.stub(testGame, 'resetGame');
    testGame.setDifficulty();

    expect(testGame.resetGame.called).to.be.true;

    testGame.resetGame.restore();
  });

  it('#resetGame', function () {
    var removeClassStub = sandbox.stub();
    sandbox.stub(testGame, 'hideNumberSelector');
    testGame.tableElement = {
      removeClass: removeClassStub
    };

    testGame.resetGame();

    expect(removeClassStub.calledWith('win-table')).to.be.true;
    expect(destroyCellsStub.called).to.be.true;
    expect(createCellsStub.called).to.be.true;
    expect(testGame.hideNumberSelector.called).to.be.true;
    testGame.hideNumberSelector.restore();
  });

  it('#retryGame', function () {
    var removeClassStub = sandbox.stub();
    testGame.tableElement = {
      removeClass: removeClassStub
    };

    testGame.retryGame();

    expect(removeClassStub.calledWith('win-table')).to.be.true;
    expect(resetCellsStub.called).to.be.true;
  });

  it('#showSolution', function () {
    testGame.showSolution();
    expect(showSolutionStub.called).to.be.true;
  });
});
