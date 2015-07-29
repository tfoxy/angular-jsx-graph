/*!
 * angular-jsx-graph v0.1.0
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
      .directive('jxgCreate', jxgCreateDirective);

  jxgBoardDirective.$inject = ['JXG'];

  function jxgBoardDirective(JXG) {
    var directive = {
      restrict: 'A',
      controller: controller
    };

    controller.$inject = ['$attrs', '$scope'];

    return directive;

    ////////////

    function controller($attrs, $scope) {
      /* jshint validthis: true */
      var boardAttributes = $scope.$eval($attrs.jxgBoard);
      this.board = JXG.JSXGraph.initBoard($attrs.id, boardAttributes);
    }
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
})();
