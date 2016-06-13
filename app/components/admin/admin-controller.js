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
          // cb = cb || function() {};
          token = $window.localStorage.token = res.data.token;
          vm.admin = true;
          cb(null, res);
        }, (err) => {
          cb(err);
        })
      }

      //  ADDD PICTURE FUNCTIONALITY
      // vm.addPictures = function(files) {
      //   console.log("ADD PICTURES HIT WITH : ", files);
      //
      //   var sam = $scope.myFile;
      //   console.log('SAM IS ', sam);
      //   var fd = new FormData();
      //   fd.append('file', files);
      //   // $http.post(pictureRoute, file, {
      //   //   headers: {
      //   //     token: token
      //   //   }
      //   // })
      //   // .success(function(data, status, headers, config) {
      //   //
      //   //   console.log('ADDED PICTURES');
      //   // })
      //   // .error(function(data, status, headers, config) {
      //   //   console.log('ERROR SAVING HOUSE FROM ADMIN CTRL');
      //   // })
      // }

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

        console.log('ADDED HOUSE FROM ADMIN CTRL');
      })
      .error(function(data, status, headers, config) {
        console.log('ERROR SAVING HOUSE FROM ADMIN CTRL');
      })
    }

    vm.getHouseData = function() {
      $http.get(adminRoute, {
        headers: {
          token: token
        }
      })
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
      console.log('UPDATATING LOT SIZE WITH : ', house);
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
              console.log('CANNONT GET HOUSES');
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
        console.log(house + ' HAS BEEN DELETED');
      })
      .error(function(data, status, headers, config) {
        console.log('CANNOT DELETE HOUSES');
      })
    }
  }

  }])

//   .directive('fileModel', ['$parse', function ($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var modelSetter = model.assign;
//
//             element.bind('change', function(){
//                 scope.$apply(function(){
//                     modelSetter(scope, element[0].files[0]);
//                 });
//             });
//         }
//     };
// }]);
