/*!
 * angular-jsx-graph v0.2.0
 * https://github.com/tfoxy/angular-jsx-graph
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 */

/* global JXG */

(function() {
  'use strict';

  angular.module('jsxGraph', [])
      .constant('JXG', JXG)
      .directive('jxgBoard', jxgBoardDirective)
      .directive('jxgCallback', jxgCallbackDirective)
      .directive('jxgCreate', jxgCreateDirective)
      .directive('jxgResponsive', jxgResponsiveDirective);

  Controller.$inject = ['$window', 'JXG', '$attrs', '$scope'];

  function Controller($window, JXG, $attrs, $scope) {
    /* jshint validthis: true */
    var boardAttributes = $scope.$eval($attrs.jxgBoard);
    this.board = JXG.JSXGraph.initBoard($attrs.id, boardAttributes);
  }

  jxgBoardDirective.$inject = [];

  function jxgBoardDirective() {
    var directive = {
      restrict: 'A',
      controller: Controller
    };

    return directive;

    ////////////
  }

  function jxgCallbackDirective() {
    var directive = {
      restrict: 'A',
      require: 'jxgBoard',
      link: link
    };

    return directive;

    ////////////

    function link(scope, element, attrs, ctrl) {
      var board = ctrl.board;
      var callback = scope.$eval(attrs.jxgCallback);
      callback(board);
    }
  }

  function jxgCreateDirective() {
    var directive = {
      restrict: 'A',
      require: 'jxgBoard',
      link: link
    };

    return directive;

    ////////////

    function link(scope, element, attrs, ctrl) {
      var board = ctrl.board;
      var elements = scope.$eval(attrs.jxgCreate);

      for (var i = 0; i < elements.length; ++i) {
        board.create.apply(board, elements[i]);
      }
    }
  }

  jxgResponsiveDirective.$inject = ['$window'];

  function jxgResponsiveDirective($window) {
    var directive = {
      restrict: 'A',
      require: 'jxgBoard',
      link: link
    };

    return directive;

    ////////////////

    function link(scope, element, attrs, ctrl) {
      var board = ctrl.board;

      var resize = function() {
        var container = board.containerObj;
        board.resizeContainer(container.clientWidth, container.clientHeight, true);
        board.fullUpdate();
      };

      angular.element($window).bind('resize', resize);
    }
  }
})();
