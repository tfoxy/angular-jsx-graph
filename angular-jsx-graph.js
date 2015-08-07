/*!
 * angular-jsx-graph v0.2.1
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

  Controller.$inject = ['JXG', '$attrs', '$scope'];

  function Controller(JXG, $attrs, $scope) {
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

  // jxg-responsive directive based on:
  // jsxgraph.uni-bayreuth.de/~michael/jsxgui/Examples/groups/responsive-Sf2Q63-w9Y4.html

  jxgResponsiveDirective.$inject = ['$window'];

  function jxgResponsiveDirective($window) {
    var window = angular.element($window);

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

      window.on('resize', resize);

      scope.$on('$destroy', function() {
        window.off('resize', resize);
      });
    }
  }
})();
