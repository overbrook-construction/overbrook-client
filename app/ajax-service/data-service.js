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

      for (var i = 0; i < obj.allHomeData.length; i++) {
        if (obj.allHomeData[i]._id === "58be58bbd914590400de7e23") {
          var houseToMove = obj.allHomeData.splice(i, 1)[0]
          obj.allHomeData.unshift(houseToMove)
        }
      }

      $window.localStorage.setItem('allHomeData', JSON.stringify(obj.allHomeData));
      cb();
    }, function errorCallback(err) {
    })
  }

  return obj;

}])
