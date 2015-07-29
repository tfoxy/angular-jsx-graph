describe('jsxGraph', function() {
  'use strict';

  var scope, compileAndDigest, _bodyChildren;

  beforeEach(module('jsxGraph'));

  beforeEach(inject(function($rootScope, $compile, $document) {
    scope = $rootScope.$new();
    compileAndDigest = function(html) {
      var element = angular.element(html);
      $document[0].body.appendChild(element[0]);
      _bodyChildren.push(element[0]);

      $compile(element)(scope);
      scope.$digest();

      return element;
    };
    _bodyChildren = [];
  }));

  afterEach(inject(function() {
    _bodyChildren.forEach(function(child) {
      child.parentNode.removeChild(child);
    });
  }));

  describe('jxgBoard directive', function() {

    it('creates a controller', inject(function() {
      var t = '<div id="box" jxg-board></div>';
      var element = compileAndDigest(t);
      var jxgBoardCtrl = element.controller('jxgBoard');
      assert.isDefined(jxgBoardCtrl);
    }));

    it('has the board inside the controller', inject(function() {
      var t = '<div id="box" jxg-board></div>';
      var element = compileAndDigest(t);
      var jxgBoardCtrl = element.controller('jxgBoard');
      expect(jxgBoardCtrl).to.have.property('board')
          .to.have.property('container', 'box');
    }));

    it('creates an svg inside the element', inject(function() {
      var t = '<div id="box" jxg-board></div>';
      var element = compileAndDigest(t);
      assert.isDefined(element.find('svg')[0]);
    }));

    it ('accepts attributes', inject(function() {
      var t = '<div id="box" jxg-board="{axis: true}"></div>';
      var element = compileAndDigest(t);
      expect(element.find('line')).to.have.property('length', 2);
    }));

  });

  describe('jxgCallback directive', function() {

    it('calls the function with the board as a parameter', inject(function() {
      var spy = scope.cb = sinon.spy();
      var t = '<div id="box" jxg-board jxg-callback="cb"></div>';
      var element = compileAndDigest(t);
      var jxgBoardCtrl = element.controller('jxgBoard');
      assert.isTrue(spy.calledWith(jxgBoardCtrl.board));
      assert.isTrue(spy.calledOnce);
    }));

  });

  describe('jxgCreate directive', function() {

    it('can create one point', function() {
      var t = '<div id="box" jxg-board jxg-create="[[\'point\', [1, 0]]]"></div>';
      var element = compileAndDigest(t);
      expect(element.find('ellipse')).to.have.property('length', 1);
    });

    it('can create two points', function() {
      var t =
          '<div id="box" jxg-board jxg-create="[[\'point\', [1, 0]], [\'point\', [2, 0]]]"></div>';
      var element = compileAndDigest(t);
      expect(element.find('ellipse')).to.have.property('length', 2);
    });

    it('can create a functiongraph with a scope function', function() {
      scope.fn = function(x) {return 2 * x;};
      var t = '<div id="box" jxg-board jxg-create="[[\'functiongraph\', [fn]]]"></div>';
      var element = compileAndDigest(t);
      expect(element.find('path')).to.have.property('length', 1);
    });

  });

});
