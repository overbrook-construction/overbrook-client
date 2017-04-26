'use strict';

require('ngstorage');
var url = require('url');
require(__dirname + '/../gallery/gallery-controller');

angular.module('InfoModule', ['AjaxService', 'ngStorage'])
.controller('InfoController', ['ajax', '$controller', '$window', function(ajax, $controller, $window) {

  // PARSING THE ID OUT OF THE URL
  var string = document.URL
  var newId = url.parse(string).hash
  var useId = newId.split('').splice(10, 25).join('');
  this.idUrl = useId;

  var data;

  function reloadPage() {
    $window.location.reload();
  }

  function resetToken() {
    $window.localStorage.token = null;
  }
  resetToken();

  this.anFunc = function(){}

  this.getData = function() {
    if ($window.localStorage.getItem('allHomeData')){
      var yup = JSON.parse($window.localStorage.getItem('allHomeData'));
      data = yup
      this.singleHouseDataLoader(useId, data)
    }
    else {
      ajax.getData(function(){
        data = ajax.allHomeData;
        reloadPage();
      });
    }
  }

  this.singleHomeData = {};

  var frontPicture = [];
  this.frontPicture = frontPicture

  this.singleHouseDataLoader = function(useId, data){
    var nA = 'N/A';

    for (var key in data) {
      var obj = data[key]

      if (data[key]._id == useId) {
        if (obj.status == 'Future') {
          var removeClass = document.getElementsByClassName('removeFuture');
          for (var i = 0; i < removeClass.length; i++) {
            removeClass[i].style.display = 'none';
          }
          this.singleHomeData.address = obj.address;
          this.singleHomeData.beginDate = obj.beginDate;
          frontPicture.push(obj.pics[0]);
          if (obj.lotsize == null) {
            this.singleHomeData.lotsize = nA;
          }
          else {
            this.singleHomeData.lotsize = obj.lotsize;
          }
        }

        else {
          if (obj.status == 'Constructing') {
            var removeSlider = document.getElementsByClassName('infoSliderContainer');
            removeSlider[0].style.display = 'none';
          }

          this.singleHomeData.address = obj.address;
          if (obj.sqft == null) {
            this.singleHomeData.sqft = nA;
          }
          else {
            this.singleHomeData.sqft = obj.sqft;
          }

          if (obj.bedrooms == null) {
            this.singleHomeData.bedrooms = nA;
          }
          else {
            this.singleHomeData.bedrooms = obj.bedrooms;
          }

          if (obj.baths == null) {
            this.singleHomeData.baths = nA;
          }
          else {
            this.singleHomeData.baths = obj.baths;
          }

          if (obj.lotsize == null || undefined) {
            this.singleHomeData.lotsize = nA;
          }
          else {
            this.singleHomeData.lotsize = obj.lotsize;
          }

          this.singleHomeData.schooldistrict = obj.schooldistrict;
          this.singleHomeData.elementary = obj.elementary;
          this.singleHomeData.ms = obj.ms;
          this.singleHomeData.hs = obj.hs;
          this.singleHomeData.status = obj.status;
          this.singleHomeData.pics = obj.pics;
          this.singleHomeData.mapPic = obj.pics[obj.pics.length-1];
          frontPicture.push(obj.pics[0]);
          this.singleHomeData.changePic = function(key, value) {
            frontPicture.pop();
            frontPicture.push(value);
          }
        }
      }
    }
  }

}])
