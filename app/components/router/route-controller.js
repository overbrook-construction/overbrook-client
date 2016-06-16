'use strict';

angular.module('RouteModule', [require('angular-route')])
  .config(['$routeProvider', function(route) {
    route
      .when('/home', {
        templateUrl: './home-view.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      })
      .when('/about', {
        templateUrl: './about-view.html',
        controller: 'aboutController'
      })
      .when('/map', {
        templateUrl: './map-view.html',
        controller: 'MapController',
        controllerAs: 'mapCtrl'
      })
      .when('/gallery', {
        templateUrl: './gallery-view.html',
        controller: 'GalleryController',
        controllerAs: 'galleryCtrl'
      })
      .when('/gallery/:searchParams', {
        templateUrl: './info-view.html',
        controller: 'InfoController',
        controllerAs: 'infoCtrl'
      })
      .when('/contact', {
        templateUrl: './contact-view.html',
        controller: 'contactController',
        controllerAs: 'contactCtrl'
      })
      .when('/admin', {
        templateUrl: './admin-view.html',
        controller: 'AdminController',
        controllerAs: 'adminCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      })
  }])
