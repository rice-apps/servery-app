'use strict';

angular.module('serveryApp', ['ui.bootstrap', 'serveryApi', 'serveryFilters','userApi','ngRoute'])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'static/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/template', {
        templateUrl: 'static/views/template.html'
      })
      .when('/userSettings', {
        templateUrl: 'static/views/userSettings.html',
        controller: 'UserSettingsCtrl'
      })
      .when('/quickView', {
        templateUrl: 'static/views/quickView.html',
        controller: 'QuickViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
