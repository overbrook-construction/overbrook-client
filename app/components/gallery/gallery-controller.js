'use strict';

require(__dirname + '/../../ajax-service/data-service');
require(__dirname + '/../../ajax-service/geo-service');

angular.module('GalleryModule', ['AjaxService', 'GeoService'])
  .controller('GalleryController', ['$location', 'ajax', '$window', 'geo', function($location, ajax, $window, geo) {

    var vm = this;
    vm.houseData;
    var data;

    function resetToken() {
      $window.localStorage.token = null;
    }
    resetToken();

// CHECKING FOR DATA IN LOCAL STORAGE AND USING AJAX SERVICE IF IT INS'T THERE
    vm.getData = function() {
      if ($window.localStorage.getItem('allHomeData')) {
        var yup = JSON.parse($window.localStorage.getItem('allHomeData'));
        data = yup
      }
      else {
          ajax.getData();
      }
    }

// BUTTON CLICKING FUNCTIONALITY
    vm.changeButtonColor = function(buttonClicked) {
      var count = 0;
      setColor(buttonClicked);
    }

    function setColor(buttonClicked){
      if (buttonClicked === 'Complete') {
        var buttonClicked;
        buttonClicked = 'completed';
      }
      var completeButton = document.getElementsByName('filterButton');
      for (var i = 0; i < completeButton.length; i++) {
        if (completeButton[i].className !== buttonClicked) {
          completeButton[i].className = 'grayButton';
        }
        if (completeButton[i].id == buttonClicked) {
          completeButton[i].className = buttonClicked;
        }
      }
    }


  vm.showInfo = false;


  vm.clickedHomePicArray = [];
  vm.clickedAddress = [];

  vm.showSideCompleted = function(clickedValue){
    vm.clickedHomePicArray = [];
    vm.clickedAddress = [];
    for (var key in data) {
      var obj = data[key];
      if(obj.status === clickedValue) {
        vm.clickedHomePicArray.push(obj);
        vm.clickedAddress.push(obj);
      }
    }
  }



  vm.changeStateFalse = function(){
    vm.showInfo = false;
  }

  vm.changeStateTrue = function() {
    vm.showInfo = true;
  }

  vm.singleHomeData = {};

    vm.showInfoView = function() {
      $location.path('/info');
    }

    vm.runSingleData = function(id) {
      vm.singleHouseDataLoader(id);
    }

    vm.singleHouseDataLoader = function(id){
      var singleHomeData = {};
      for (var key in data) {
        var obj = data[key]
        if (data[key]._id == id) {
          // console.log('THIS IS THE MATCHING OBJECT', obj);
          vm.singleHomeData.address = obj.address;
          vm.singleHomeData.sqft = obj.sqft;
          vm.singleHomeData.bedrooms = obj.bedrooms;
          vm.singleHomeData.bathrooms = obj.bathrooms;
          vm.singleHomeData.lotsize = obj.lotsize;
          vm.singleHomeData.schooldistrict = obj.schooldistrict;
          vm.singleHomeData.elementary = obj.elementary;
          vm.singleHomeData.middle = obj.middle;
          vm.singleHomeData.hs = obj.hs;
          vm.singleHomeData.status = obj.status;
          vm.singleHomeData.pics = obj.pics;
          vm.singleHomeData.mapPic = obj.pics[obj.pics.length-1];
          vm.singleHomeData.frontPic = obj.pics[0];
        }
      }
    }
  }])
