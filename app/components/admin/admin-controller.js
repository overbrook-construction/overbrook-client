'use strict';

var constants = require(__dirname + '/../../constants');
require('./auth_service');

angular.module('AdminModule', [])
  .controller('AdminController', ['$http', '$parse', '$window', '$scope', function($http, $parse, $window, $scope) {

    var vm = this;
    var token;
    var adminRoute  = constants.baseUrl + '/addHomes';
    var pictureRoute = constants.baseUrl + '/picUpload';
    var addUser = constants.baseUrl + '/addUser';
    var getUser  = constants.baseUrl + '/userLogin';
    var picRoute = constants.baseUrl + '/addPics';

    vm.admin = false;

    vm.resetForm = function(formName){
      var submitForm = document.getElementsByName(formName)[0];
      submitForm.reset();
    }

    vm.clearToken = function() {
      $window.localStorage.token = null;
    }

    vm.login = function(user, cb){
      cb = cb || function() {};
      $http.get(getUser, {
        headers: {
          authorization: 'Basic ' + btoa(user.username + ':' + user.password)
        }})
        .then((res) => {
          token = $window.localStorage.token = res.data.token;
          vm.admin = true;
          cb(null, res);
        }, (err) => {
          cb(err);
        })
      }

      vm.allHouses;

      vm.submitHouse = function(newHouse) {
        $http.post(adminRoute, newHouse, {
          headers: {
            token: token
          }
        })
        .success(function(data, status, headers, config) {
          vm.getHouseData();
          vm.resetForm('submitHouseForm');
        })
        .error(function(data, status, headers, config) {
        })
      }

      vm.getHouseData = function() {
        $http.get(adminRoute, {
          headers: {
            token: token
          }
        })
        .success(function(data, status, headers, config) {
          vm.allHouses = data;
        })
        .error(function(data, status, headers, config) {
        })
      }

      vm.updateHouse = function(house) {
        vm.updateHouse.rendered = null;
        $http.put(adminRoute + '/' + house._id, house, {
          headers: {
            token: token
          }
        }).success(function(data, status, headers, config) {
          vm.getHouseData();
          vm.resetForm('updateHouseForm');
        })
        .error(function(data, status, headers, config) {
        })
      }

      vm.deleteHouse = function(house, address) {
        var answer = window.confirm('Are you sure you want to delete the home with address : ' + address);
        if (answer) {

          $http.delete(adminRoute + '/' + house, {
            headers: {
              token: token
            }
          }).success(function(data, status, headers, config) {
            vm.getHouseData();
          })
          .error(function(data, status, headers, config) {
          })
        }
      }

  }])
