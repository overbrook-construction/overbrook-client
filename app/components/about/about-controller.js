'use strict';

angular.module('AboutModule', [])
  .controller('aboutController', ['$window', function($window) {
    function resetToken() {
      $window.localStorage.token = null;
    }
    resetToken();
  }])
