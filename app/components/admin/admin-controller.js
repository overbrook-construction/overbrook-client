'use strict';

// BRINGING IN THE SERVICEva
var constants = require(__dirname + '/../../constants');
angular.module('AdminModule', [])
  .controller('AdminController', ['$http', '$parse', '$window', function($http, $parse, $window) {

    var vm = this;

    var token;

    var adminRoute  = constants.baseUrl + '/addHomes';
    var addUser = constants.baseUrl + '/addUser';
    var getUser  = constants.baseUrl + '/userLogin';
    var picRoute = constants.baseUrl + '/addPics';

    vm.admin = false;

    vm.clearToken = function() {
      $window.localStorage.token = null;
    }

    vm.login = function(user, cb){
      console.log('LOGIN HIT WITH USER : ', user);
      cb = cb || function() {};
      $http.get(getUser, {
        headers: {
          authorization: 'Basic ' + btoa(user.username + ':' + user.password)
        }})
        .then((res) => {
          // cb = cb || function() {};
          token = $window.localStorage.token = res.data.token;
          console.log('AUTH SERVICE : TOKEN GEN : ', token);
          vm.admin = true;
          cb(null, res);
        }, (err) => {
          cb(err);
        })
      }

    vm.allHouses;

    vm.submitHouse = function(newHouse) {
      $http.post(adminRoute, newHouse, {
        // headers: {
        //   token: 'blah'
        // }
      })
      .success(function(data, status, headers, config) {
        console.log('ADDED HOUSE FROM ADMIN CTRL');
      })
      .error(function(data, status, headers, config) {
        console.log('ERROR SAVING HOUSE FROM ADMIN CTRL');
      })
    }

    vm.getHouseData = function() {
      console.log('GET REQUEST HAS BEEN RECEIVED');
      $http.get(adminRoute)
      .success(function(data, status, headers, config) {
        console.log('DATA FROM GET IS : ', data);
        // allHouses.push(data);
        vm.allHouses = data;
      })
      .error(function(data, status, headers, config) {
        console.log('CANNONT GET HOUSES');
      })
    }

    vm.updateHouse = function(house) {
      vm.updateHouse.rendered = null;
      $http.put(adminRoute + '/' + house._id, house, {

      }).success(function(data, status, headers, config) {
        console.log('DATA FROM GET IS : ', data);
      })
      .error(function(data, status, headers, config) {
              console.log('CANNONT GET HOUSES');
      })
    }

    vm.deleteHouse = function(house, token) {
      console.log('DELETE HOUSE HIT WITH : ', house);
      $http.delete(adminRoute + '/' + house, {

      }).success(function(data, status, headers, config) {
        console.log(house + ' HAS BEEN DELETED');
      })
      .error(function(data, status, headers, config) {
        console.log('CANNOT DELETE HOUSES');
      })
    }

  }])
