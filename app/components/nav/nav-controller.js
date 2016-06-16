'use strict';

require(__dirname + '/../gallery/gallery-controller');

angular.module('NavModule', [])
  .controller('navController', ['$controller', function($controller) {

  }])
  
  .directive('navDirective', function() {
    return {
      restrict: 'E',
      templateUrl: './nav-view.html'
    }
  })
