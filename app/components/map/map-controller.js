'use strict';

const angular = require('angular');
require(__dirname + '/../gallery/gallery-controller');

require(__dirname + '/../../ajax-service/data-service');

angular.module('MapModule', ['AjaxService'])
  .controller('MapController', ['$http', '$location', 'ajax', '$controller', '$window', function($http, $location, ajax, $controller, $window) {

    var vm = this;

    vm.completeIcon = './media/complete-home.png';
    vm.constructionIcon = './media/construction-home.png';
    vm.futureIcon = './media/future-home.png';

    // MAP OBJECT
    var map = {};
    vm.initMap = function() {
    map.mapDiv = document.getElementById('map');
    map.googleMap = new google.maps.Map(map.mapDiv, {
      center: {lat: 47.629, lng: -122.211},
      zoom: 12
    });
  }

  var completedGeoAddresses;
  var constructingGeoAddresses;
  var futureGeoAddresses;

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

    var data;


    vm.getData = function() {
      if ($window.localStorage){
        var yup = JSON.parse($window.localStorage.getItem('allHomeData'));
        data = yup
      }
      else {

      ajax.getData();
      vm.houseData = ajax.allHomeData;
      data = ajax.allHomeData;
    }
  }

    vm.clickedAddress = [];
    vm.geoArray = [];
    vm.clickedPics = [];

  //  GEO CODES THE ADDRESSES PASSED IN BY SIDE BAR FUNCTION BASED ON CLICKED VALUE
  var geoFunc = function(objectArray, iconValue, cb, clickedValue) {
    var geoArray = [];

    var promiseArray = objectArray.map(function(value, index) {
      var geocoder = new google.maps.Geocoder();

      return new Promise(function(resolve, reject){

          geocoder.geocode({'address': value.address}, function(results, status) {
            if(status === google.maps.GeocoderStatus.OK) {
              resolve(results[0].geometry.location);
            }

          })

        })
      })
      Promise.all(promiseArray)
      .then(function(result) {

        if (clickedValue == 'Complete') {
          completedGeoAddresses = result;
        }

        if (clickedValue == 'Constructing') {
          constructingGeoAddresses = result;
        }

        if (clickedValue == 'Future') {
          futureGeoAddresses = result;
        }

        mapObject.clearMarkers();
        mapObject.drawMarkers(result, iconValue, objectArray, clickedValue);
      })
      .catch(function(error){
      })
  }


    var contentFig;
    var homePic;

    // MAP FUNCTIONALITY
    var markers = [];
    var mapObject = {
      drawMarkers: function(geoArray, iconValue, objectArray) {
        for (var i = 0; i < geoArray.length; i++) {

          var setContent = '<div id="popDiv">\
          <img class="popPic" src=' + objectArray[i].pics[0] + ' />\
          <p class="popAddress">' + objectArray[i].address + '</p>\
          <a href="#/gallery/'+ objectArray[i]._id +'" class="viewDetailsButton" ng-click="mapCtrl.sayName()">View Details</a>\
          </div>';

          var infowindow = new google.maps.InfoWindow({
            content: setContent
          });

          var marker = new google.maps.Marker({
            position: geoArray[i],
            title: objectArray[i].address,
            icon: iconValue
          });


          function closeInfo () {
            console.log('CLOSE INFO HAS BEEN HIT');
            infowindow.close();
          }

          (function(marker, infowindow) {
            marker.addListener('click', function() {
              if(infowindow) {
                // infowindow.close();
                closeInfo();
              }
              closeInfo();
              infowindow.close();
              infowindow.open(map.googleMap, marker)
            })
          })(marker, infowindow);

          markers.push(marker);
        }
        mapObject.setMapOnAll(map.googleMap);
      },
      setMapOnAll: function(map) {
        for(var i = 0; i < markers.length; i++) {
          markers[i].setMap(map)
        }
      },
      clearMarkers: function() {
        mapObject.setMapOnAll(null);
        markers = [];
      }
    }

    // if (completedGeoAddresses.length) {
    //   mapObject.drawMarkers(completedGeoAddresses, iconValue, vm.clickedAddress)
    // }

    vm.showSideCompleted = function(clickedValue, iconValue){



      vm.clickedAddress = [];
      var icon;
      for (var key in data) {
        var obj = data[key];
        if(obj.status === clickedValue) {
          vm.clickedAddress.push(obj);
        }
      }
      if (clickedValue == 'Complete' && completedGeoAddresses){
        mapObject.clearMarkers();
        mapObject.drawMarkers(completedGeoAddresses, iconValue, vm.clickedAddress)
      }
      if (clickedValue == 'Constructing' && constructingGeoAddresses){
        mapObject.clearMarkers();
        mapObject.drawMarkers(constructingGeoAddresses, iconValue, vm.clickedAddress)
      }
      if (clickedValue == 'Future' && futureGeoAddresses){
        mapObject.clearMarkers();
        mapObject.drawMarkers(futureGeoAddresses, iconValue, vm.clickedAddress)
      }
      else {
        geoFunc(vm.clickedAddress, iconValue, function(){}, clickedValue);
      }
    }

  }])
