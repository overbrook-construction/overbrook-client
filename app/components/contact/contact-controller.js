'use strict';

var constants = require(__dirname + '/../../constants');

angular.module('ContactModule', [])
.controller('contactController', ['$http', '$window', function($http, $window) {

  var emailRoute = constants.baseUrl + '/email'

  function resetToken() {
    $window.localStorage.token = null;
  }
  resetToken();

  var emailForm = document.getElementsByName('emailForm')[0];
  this.resetForm = function(){
    emailForm.reset();
  }

  this.sendEmail = function(user) {
    $http.post(emailRoute, user)
    .success(function(data, status, headers, config) {
      console.log('SUCCESSFULL EMAIL FROM CONTROLLER');
    })
    .error(function(data, status, headers, config) {
      console.log('ERROR SENDING EMAIL');
    })
  }
}])
