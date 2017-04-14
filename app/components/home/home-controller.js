'use strict';

require(__dirname + '/../../ajax-service/data-service');

angular.module('HomeModule', ['AjaxService'])

.controller('HomeController', ['ajax', '$window', function(ajax, $window) {

  function resetToken() {
    $window.localStorage.token = null;
  }
  resetToken();

  this.getData = function() {
    console.log('GETTING DATA VIA AJAX');
    ajax.getData(function(){});
  }
}])
