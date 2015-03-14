var rewire = require('rewire'),
  numberSelectorModule = rewire('../../app/scripts/numberSelector'),
  selectorFactory = numberSelectorModule.numberSelectorFactory,
  utils = numberSelectorModule.utils,
  expect = require('chai').expect,
  sinon = require('sinon');

describe('#numberSelector Module', function () {
  var sandbox = sinon.sandbox.create();

  after(function () {
    sandbox.restore();
  });

  describe('NumberSelector class', function () {
    var fakeGame = {
      tableElement: {
        width: function () {
          return 500
        }
      }
    };
    var testSelector,
      hideStub,
      cssStub,
      revert;

    before(function () {
      hideStub = sandbox.stub();
      cssStub = sandbox.stub();
      revert = numberSelectorModule.__set__({
        '$': function () {
          return {
            hide: hideStub,
            css: cssStub
          }
        }
      });
      sandbox.stub(utils, 'setupListeners');
      testSelector = selectorFactory(fakeGame);
    });

    it('Singleton', function () {
      testSelector = selectorFactory(fakeGame);
      testSelector = selectorFactory(fakeGame);
      testSelector = selectorFactory(fakeGame);
      testSelector = selectorFactory(fakeGame);
      expect(utils.setupListeners.callCount).to.equal(1);
    });

    it('Constructor', function () {
      expect(testSelector.game).to.deep.equal(fakeGame);
      expect(utils.setupListeners.called).to.be.true;
    });

    it('#hide', function () {
      testSelector.hide();
      expect(hideStub.called).to.be.true;
    });
  });

  it('utils', function () {
    var eachStub = sandbox.stub(),
      onStub = sandbox.stub(),
      fakePadNumbers = {
        each: eachStub
      },
      fakePadCancel = {
        on: onStub
      };
    utils.setupListeners(fakePadNumbers, fakePadCancel);
    expect(eachStub.called).to.be.true;
    expect(onStub.called).to.be.true;
  });

});
