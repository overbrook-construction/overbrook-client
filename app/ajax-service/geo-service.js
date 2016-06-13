'use strict';

var geoService = angular.module('GeoService', []);

geoService.factory('geo', [function () {
  var names = {
    completedGeoAddresses: [],
    constructingGeoAddresses: [],
    futureGeoAddresses: []
  };

  return names;
}])
