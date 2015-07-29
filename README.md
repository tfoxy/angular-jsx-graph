# angular-jsx-graph

[![npm version](http://img.shields.io/npm/v/angular-jsx-graph.svg)](https://npmjs.org/package/angular-jsx-graph) ![bower version](https://img.shields.io/bower/v/angular-jsx-graph.svg) [![build status](https://img.shields.io/travis/tfoxy/angular-jsx-graph.svg)](https://travis-ci.org/tfoxy/angular-jsx-graph)

JSXGraph directives for AngularJS


## Requirements

  - [AngularJS](https://github.com/angular/angular.js)
  - [JSXGraph](https://github.com/jsxgraph/jsxgraph)


## Load into your app

You can get it from [Bower](http://bower.io/)

```sh
bower install angular-jsx-graph
```

Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.3/jsxgraphcore.js"></script>
<script type="text/javascript" src="bower_components/angular-jsx-graph/angular-jsx-graph.js"></script>
```

Add the specific module to your dependencies:

```javascript
angular.module('myApp', ['jsxGraph', ...])
```


## Usage examples

```html
  <!--
    Inside the controller.js:
    $scope.cb = function(board) {
      board.create('point', [0, 1]);
    }
  -->
  <div id="box" class="jxgbox" style="width:600px; height:600px;"
      jxg-board="{axis: true, grid: true}" jxg-callback="cb"></div>
```


## Directives

  - `jxg-board`: Creates a board on the element. The element must have the id attribute.
    Accepts an object for the board attributes.
  - `jxg-callback`: Receives a function that is called after the board is created.
    The function has the board as a parameter.
  - `jxg-create`: Creates elements inside the board.
    For example, to create 2 points on {1,0} and {2,0}:
    ```html
    <div id="box" jxg-board jxg-create="[['point', [1, 0]], ['point', [2, 0]]]"></div>
    ```
