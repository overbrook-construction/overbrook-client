'use strict';

var constants = require(__dirname + '/../constants');

var ajaxService = angular.module('AjaxService', []);

// USING FACTORY TO GET DATA FROM MLAB AND PERSIST THROUGH CONTROLLERS
ajaxService.factory('ajax', ['$http', '$window', function($http, $window) {

  var adminRoute = constants.baseUrl + '/addHomes';

  var obj = {};
  var obj2 = {};

  obj2.allHomeData2;
  obj.allHomeData;

  obj.sayName = function() {
  }

  obj.getData = function(cb) {
    $http.get(adminRoute)
    .then(function successCallback(response) {

      obj2.allHomeData2 = response.data;

      for (var i = 0; i < obj2.allHomeData2.length; i++) {
        if (obj2.allHomeData2[i]._id === "58be64f38359750400f02164") {
          var houseToMove = obj2.allHomeData2.splice(i, 1)[0]
          obj2.allHomeData2.unshift(houseToMove)
          obj.allHomeData = obj2.allHomeData2;
        }
      }

      for (var i = 0; i < obj.allHomeData.length; i++) {
        if (obj.allHomeData[i]._id === "58be58edd914590400de7e24") {
          var houseToMove2 = obj.allHomeData.splice(i, 1)[0]
          obj.allHomeData.unshift(houseToMove2)
        }
      }


      // for (var i = 0; i < obj.allHomeData.length; i++) {
      //   if (obj.allHomeData[i]._id === "58be64f38359750400f02164") {
      //     var houseToMove = obj.allHomeData.splice(i, 2)[0]
      //     obj.allHomeData.unshift(houseToMove)
      //   }58be58bbd914590400de7e23
      // }

      $window.localStorage.setItem('allHomeData', JSON.stringify(obj.allHomeData));
      cb();
    }, function errorCallback(err) {
    })
  }

  return obj;

}])
