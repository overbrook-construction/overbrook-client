'use strict';

// var tabService = angular.module('TabService', []);
//
// tabService.factory('tab', [function() {
//   var passedTab = {
//     tab = 'sam'
//   };
//   return passedTab;
// }]);


var tabService = angular.module('TabService', []);

tabService.factory('tab', [function () {
  var tabs = {
    tab: 'Complete',
    setTab: function(pickedTab, cb1, cb2) {
      console.log('SET TAB HAS BEEN HIT WITH : ', pickedTab, cb1, cb2);
      tabs.tab = pickedTab;
      cb1(tabs.tab);
      cb2(tabs.tab);
    }
  };

  return tabs;
}])
