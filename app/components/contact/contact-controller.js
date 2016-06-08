'use strict';

var constants = require(__dirname + '/../../constants');

angular.module('ContactModule', [])
.controller('contactController', ['$http', function($http) {
  var emailRoute = constants.baseUrl + '/email'


  var emailForm = document.getElementsByName('emailForm')[0];
  this.resetForm = function(){
    emailForm.reset();
  }


  this.sendEmail = function(user) {
    console.log('USER FROM FORM IS : ', user);
    $http.post(emailRoute, user)
    .success(function(data, status, headers, config) {
      console.log('SUCCESSFULL EMAIL FROM CONTROLLER');
    })
    .error(function(data, status, headers, config) {
      console.log('ERROR SENDING EMAIL');
    })
  }
}])
