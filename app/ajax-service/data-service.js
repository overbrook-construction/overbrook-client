'use strict';

var constants = require(__dirname + '/../constants');

var ajaxService = angular.module('AjaxService', []);

// USING FACTORY TO GET DATA FROM MLAB AND PERSIST THROUGH CONTROLLERS
ajaxService.factory('ajax', ['$http', '$window', function($http, $window) {

  var adminRoute = constants.baseUrl + '/addHomes';

  var obj = {};

  obj.allHomeData;

  obj.sayName = function() {
  }

  obj.getData = function(cb) {
    $http.get(adminRoute)
    .then(function successCallback(response) {
      obj.allHomeData = response.data;
      $window.localStorage.setItem('allHomeData', JSON.stringify(obj.allHomeData));
      cb();

    }, function errorCallback(err) {
        console.error(err);
    })
  }

  return obj;

}])
