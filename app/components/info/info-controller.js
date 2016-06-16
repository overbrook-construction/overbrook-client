'use strict';

// require(__dirname + '/../../ajax-service/data-service');
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

    function reloadPage() {
      $window.location.reload();
    }

    function resetToken() {
      $window.localStorage.token = null;
    }
    resetToken();

    var data;

    this.anFunc = function(){}

    this.getData = function() {
      if ($window.localStorage.getItem('allHomeData')){
        var yup = JSON.parse($window.localStorage.getItem('allHomeData'));
        data = yup
        this.singleHouseDataLoader(useId, data)
      }
      else {
        console.log('ELSE BLOCK HIT');
        ajax.getData(function(){
          data = ajax.allHomeData;
          reloadPage();
        });
    }
  }

  //   (function getIt() {
  //     return new Promise(function(resolve, reject) {
  //
  //     ajax.getData();
  //     // data = ajax.allHomeData;
  //   resolve(data);
  // })
  //   // cb(useId, data)
  // })()
  // .then(function(result){
  //   data = JSON.parse($window.localStorage.getItem('allHomeData'))
  //   console.log(result);
  // })




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
          if (obj.lotSize == null) {
            this.singleHomeData.lotSize = nA;
          }
          else {
            this.singleHomeData.lotSize = obj.lotSize;
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

        if (obj.lotSize == null || undefined) {
          this.singleHomeData.lotSize = nA;
        }
        else {
          this.singleHomeData.lotSize = obj.lotSize;
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
