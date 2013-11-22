'use strict';

angular.module('serveryApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/active', {
        templateUrl: 'static/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/completed', {
        templateUrl: 'static/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/serveries', {
        templateUrl: 'static/views/serveries.html',
        controller: 'ServeriesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });