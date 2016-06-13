'use strict';

const angular = require('angular');
require(__dirname + '/../gallery/gallery-controller');

require(__dirname + '/../../ajax-service/data-service');
require(__dirname + '/../../ajax-service/geo-service');


angular.module('MapModule', ['AjaxService'])
  .controller('MapController', ['$http', '$location', 'ajax', '$controller', '$window', 'geo', function($http, $location, ajax, $controller, $window, geo) {

    var vm = this;
    
    function resetToken() {
      $window.localStorage.token = null;
    }
    resetToken();

// CHECKING FOR DATA IN LOCAL STORAGE AND USING AJAX SERVICE IF IT INS'T THERE
    vm.getData = function() {
      if ($window.localStorage.getItem('allHomeData')){
        var yup = JSON.parse($window.localStorage.getItem('allHomeData'));
        data = yup
      }
      else {
        ajax.getData();
        vm.houseData = ajax.allHomeData;
        data = ajax.allHomeData;
      }
    }

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
          geo.completedGeoAddresses = result;
        }

        if (clickedValue == 'Constructing') {
          constructingGeoAddresses = result;
          geo.constructingGeoAddresses = result;
        }

        if (clickedValue == 'Future') {
          futureGeoAddresses = result;
          geo.futureGeoAddresses = result;
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
        var setContent;
        var infowindow = new google.maps.InfoWindow({
          content: setContent
        });

        for (var i = 0; i < geoArray.length; i++) {

          setContent = '<div id="popDiv">\
          <img class="popPic" src=' + objectArray[i].pics[0] + ' />\
          <p class="popAddress">' + objectArray[i].address + '</p>\
          <a href="#/gallery/'+ objectArray[i]._id +'" class="viewDetailsButton" ng-click="mapCtrl.sayName()">View Details</a>\
          </div>';

          var marker = new google.maps.Marker({
            position: geoArray[i],
            title: objectArray[i].address,
            icon: iconValue
          });


          function closeInfo () {
            infowindow.close();
          }

          (function(marker, setContent) {
            marker.addListener('click', function() {
              if(infowindow) {
                closeInfo();
              }
              closeInfo();
              infowindow.close();
              infowindow.setContent(setContent)
              infowindow.open(map.googleMap, marker)
            })
          })(marker, setContent);

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

    vm.showSideCompleted = function(clickedValue, iconValue){
      vm.clickedAddress = [];
      var icon;
      for (var key in data) {
        var obj = data[key];
        if(obj.status === clickedValue) {
          vm.clickedAddress.push(obj);
        }
      }
      if (clickedValue == 'Complete' && geo.completedGeoAddresses){
        mapObject.clearMarkers();
        mapObject.drawMarkers(geo.completedGeoAddresses, iconValue, vm.clickedAddress)
      }
      if (clickedValue == 'Constructing' && geo.constructingGeoAddresses){
        mapObject.clearMarkers();
        mapObject.drawMarkers(geo.constructingGeoAddresses, iconValue, vm.clickedAddress)
      }
      if (clickedValue == 'Future' && geo.futureGeoAddresses.length){
        mapObject.clearMarkers();
        mapObject.drawMarkers(geo.futureGeoAddresses, iconValue, vm.clickedAddress)
      }
      else {
        geoFunc(vm.clickedAddress, iconValue, function(){}, clickedValue);
      }
    }

  }])
