'use strict';

var tabService = angular.module('TabService', []);

/*
  set tab is running 'show side completed' and 'change button color', with passed in values from the view.
*/

tabService.factory('tab', [function () {
  var tabs = {
    tab: 'Complete',
    currentIcon: './media/complete-home.png',
    changeIcon: function(iconValue) {
      tabs.currentIcon = iconValue;
    },
    setTab: function(pickedTab, cb1, cb2, iconValue) {
      tabs.changeIcon(iconValue);
      tabs.tab = pickedTab;
      cb1(tabs.tab, iconValue);
      cb2(tabs.tab);
    }
  };

  return tabs;
}])
