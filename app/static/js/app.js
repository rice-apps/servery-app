'use strict';

angular.module('serveryApp', ['ui.bootstrap', 'serveryApi', 'serveryFilters','userApi','ngRoute','dispatch'])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'static/views/main.html',
        controller: 'MainCtrl',
        resolve: {
          serveries: ['Servery', '$q', function(Servery,$q) { 
            var defered = $q.defer();

            Servery.all(function(a){
              defered.resolve(a.result);
            });

            return defered.promise;


          }]
        }
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
        controller: 'QuickViewCtrl',
        resolve: {
          nextmeals: ['Servery','$q', function(Servery,$q) {
            var defered = $q.defer();

            Servery.nextMeals(function(result)
            {
              defered.resolve(result);
            });
            return defered.promise;
          }]
        }
      })

      .when('/search', {
        templateUrl: 'static/views/search.html'
      })
     
      .otherwise({
        redirectTo: '/'
      });
  });
