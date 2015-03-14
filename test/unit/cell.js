var cellModule = require('../../app/scripts/cell'),
  Cell = cellModule.Cell,
  utils = cellModule.utils,
  expect = require('chai').expect,
  $ = require('jquery'),
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
    var fakePosition = {x: 1, y:2},
      fakeGame = {name: 'game'},
      testCell,
      removeClassStub,
      addClassStub,
      fakeElement;


    beforeEach(function () {
      removeClassStub = sandbox.stub();
      addClassStub = sandbox.stub().returns({
        removeClass: removeClassStub
      });
      fakeElement = {
        addClass: addClassStub,
        html: sandbox.stub(),
        on: sandbox.stub(),
        remove: sandbox.stub()
      }

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

    it('#setToFixedCell', function () {
      sandbox.stub(testCell, 'setValue');

      testCell.setToFixedCell(5);

      expect(testCell.setValue.calledWith(5)).to.be.true;
      expect(testCell.state).to.be.equal('fixed');
      expect(fakeElement.addClass.calledWith('fixedCell')).to.be.true;
      expect(removeClassStub.calledWith('emptyCell')).to.be.true;
    });

    it('#setToEmptyCell', function () {
      sandbox.stub(testCell, 'setValue');

      testCell.setToEmptyCell();

      expect(testCell.setValue.calledWith(0)).to.be.true;
      expect(fakeElement.addClass.calledWith('emptyCell')).to.be.true;
      expect(removeClassStub.calledWith('fixedCell')).to.be.true;
      expect(fakeElement.on.calledWith('click')).to.be.true;
    });

    describe('#setValue', function () {
      it('should handle case when value is 0', function () {
        testCell.setValue(0);

        expect(testCell.val).to.be.equal(0);
        expect(fakeElement.html.calledWith("")).to.be.true;
        expect(testCell.state).to.be.equal('empty');
      });

      it('should handle case when value is NOT 0', function () {
        testCell.setValue(5);

        expect(testCell.val).to.be.equal(5);
        expect(fakeElement.html.calledWith("5")).to.be.true;
        expect(testCell.state).to.be.equal('filled');
      });
    });

    it('#destroy', function () {
      testCell.destroy();
      expect(fakeElement.remove.called).to.be.true;
    });
  });

});
