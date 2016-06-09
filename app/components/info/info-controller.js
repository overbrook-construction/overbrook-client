'use strict';

// require(__dirname + '/../../ajax-service/data-service');
require('ngstorage');

var url = require('url');

require(__dirname + '/../gallery/gallery-controller');

angular.module('InfoModule', ['AjaxService', 'ngStorage'])
  .controller('InfoController', ['ajax', '$controller', '$window', function(ajax, $controller, $window) {


  var data;


  this.getData = function() {
    if ($window.localStorage){
      var yup = JSON.parse($window.localStorage.getItem('allHomeData'));
      data = yup
    }
    else {

    ajax.getData();
    data = ajax.allHomeData;
  }
}


  // this.getData = function(cb){
  //   ajax.getData();
  //   function cb(newData) {
  //     data = newData
  //   }
  //   cb(ajax.allHomeData)
  // }
  //
  // data = ajax.allHomeData;

  // PARSING THE ID OUT OF THE URL
  var string = document.URL
  var newId = url.parse(string).hash
  var useId = newId.split('').splice(10, 25).join('');

  this.idUrl = useId;

  this.singleHomeData = {};

  var frontPicture = [];
  this.frontPicture = frontPicture

  this.singleHouseDataLoader = function(useId){

    // IF LOCAL STORAGE HAS OBJECT THEN USE THIS OBJECT
    // if ($window.localStorage.homeData) {
    //   var retrievedObj = $window.localStorage.getItem('homeData');
    //   JSON.parse(retrievedObj);
    //   console.log('OBJECT FROM LOCAL STORAGE IS : ', retrievedObj.address);
    //   // this.singleHomeData.address = retrievedObj.address
    // }
    // else {

    // var singleHomeData = {};

    // FOR THE EDGE CASE !!! INSERT ANOTHER IF STATEMENT THAT CHECKS IF THE HOUSE WITH THAT ID IS UNDER CONSTRUCTION, IF IT IS THAN SET A FLAG TO ONLY LOAD A CERTAIN VIEW WITH CERTAIN DATA
    var nA = 'N/A';

    for (var key in data) {
      var obj = data[key]

      if (data[key]._id == useId) {
        if (obj.status == 'Future') {
          // console.log(document.getElementsByClassName('removeFuture'));
          var removeClass = document.getElementsByClassName('removeFuture');
          for (var i = 0; i < removeClass.length; i++) {
            removeClass[i].style.display = 'none';
          }
          this.singleHomeData.address = obj.address;
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
        console.log('OBJECT IS : ', obj);
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

        // this.singleHomeData.lotSize = obj.lotSize;
        this.singleHomeData.schooldistrict = obj.schooldistrict;
        this.singleHomeData.elementary = obj.elementary;
        this.singleHomeData.middle = obj.middle;
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
    // var newArray = [];
    // newArray.push(this.singleHomeData);
    // $window.localStorage.setItem('homeData', JSON.stringify(this.singleHomeData));
    // $window.localStorage.setItem('homeData', JSON.stringify(newArray));

  // }
    // // SAVE THIS DATA TO LOCAL STORAGE
    //   console.log('LOCAL STORAGE FUNCTION HAS BEEN HIT WITH : ' + homeObj);
      // $window.localStorage.homeData = this.singleHomeData;
      // $window.localStorage.


  }

  }])
