var cellModule = require('../../app/scripts/cell'),
  Cell = cellModule.Cell,
  utils = cellModule.utils,
  expect = require('chai').expect,
  sinon = require('sinon');

describe('#Cell Module', function () {
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });


  describe('Cell class', function () {
    var fakeElement = {name: 'element'},
      fakePosition = {x: 1, y:2},
      fakeGame = {name: 'game'},
      testCell;

    beforeEach(function () {
      sandbox.stub(utils, 'createCell').returns(fakeElement);
      testCell = new Cell(fakePosition, fakeGame);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('Constructor', function () {
      expect(testCell.state).to.be.equal('empty');
      expect(testCell.val).to.be.equal(0);
      expect(testCell.position).to.deep.equal(fakePosition);
      expect(testCell.element).to.deep.equal(fakeElement);
      expect(testCell.game).to.deep.equal(fakeGame);
    });

    // it('#setToFixedCell', function () {
    //   sandbox.stub(testCell, 'setValue');

    //   testCell.setToFixedCell(5);

    //   expect(testCell.setValue.calledWith(5)).to.be.true;
    //   expect(testCell.state).to.be.equal('fixed');
    //   expect(testCell.position).to.deep.equal(fakePosition);
    //   expect(testCell.element).to.deep.equal(fakeElement);
    //   expect(testCell.game).to.deep.equal(fakeGame);
    // });
  });

});
