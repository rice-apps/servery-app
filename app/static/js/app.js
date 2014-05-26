'use strict';

angular.module('serveryApp', ['ui.bootstrap', 'serveryApi', 'serveryFilters','userApi'])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'static/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/template', {
        templateUrl: 'static/views/template.html'
      })
     
      .otherwise({
        redirectTo: '/'
      });
  });
