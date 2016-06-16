'use strict';

angular.module('FooterModule', [])
.controller('FooterController', function() {

})
.directive('footerDirective', function() {
  return{
    restrict: 'E',
    templateUrl: './footer-view.html'
  }
});
