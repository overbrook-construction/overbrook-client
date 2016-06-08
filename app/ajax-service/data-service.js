'use strict';
var constants = require(__dirname + '/../constants');

var ajaxService = angular.module('AjaxService', []);

// RETRIEVING DATA FROM JSON FILE THIS IS THE OLD VERSION
// ajaxService.factory('ajax', ['$http', function($http) {
//
//
//   var obj = {};
//
//   obj.allHomeData;
//
//   obj.sayName = function() {
//   }
//
//   obj.getData = function() {
//     // console.log('GET DATA IS BEING HIT');
//     $http.get('./data/new-home-data.json')
//     .then(function successCallback(response) {
//       // console.log('RESPONSE FROM HTTP GET DATA-SERVICE : ', response.data);
//       obj.allHomeData = response.data;
//       // SAVE TO SESSION STORAGE
//
//     }, function errorCallback(response) {
//     })
//   }
//
// return obj;
//
// }])

// RETRIEVING DATA FROM THE MLAB DATA BASE THIS IS THE NEW VERSION
ajaxService.factory('ajax', ['$http', '$window', function($http, $window) {

  var adminRoute = constants.baseUrl + '/addHomes';
  // this.getHouseData = function() {
  //   console.log('GET REQUEST HAS BEEN RECEIVED');
  //   $http.get(adminRoute)
  //   .success(function(data, status, headers, config) {
  //     console.log('DATA FROM GET IS : ', data);
  //     allHouses.push(data);
  //     console.log(allHouses);
  //   })
  //   .error(function(data, status, headers, config) {
  //     console.log('CANNONT GET HOUSES');
  //   })
  // }

  var obj = {};

  obj.allHomeData;

  obj.sayName = function() {
  }

  obj.getData = function() {
    // console.log('GET DATA IS BEING HIT');
    $http.get(adminRoute)
    .then(function successCallback(response) {
      // console.log('RESPONSE FROM HTTP GET DATA-SERVICE : ', response.data);
      obj.allHomeData = response.data;
      console.log('ALL HOME DATA FROM SERVICE : ', obj.allHomeData);
      $window.localStorage.setItem('allHomeData', JSON.stringify(obj.allHomeData));
      // SAVE TO SESSION STORAGE

    }, function errorCallback(response) {
    })
  }

return obj;

}])
