'use strict';

// USING THIS SERVICE TO SAVE GEO LOCATIONS FOR PERSISTANCE BETWEEN PAGE CHANGES
var geoService = angular.module('GeoService', []);

geoService.factory('geo', [function () {
  var names = {
    completedGeoAddresses: [],
    constructingGeoAddresses: [],
    futureGeoAddresses: []
  };

  return names;
}])
