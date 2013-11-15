/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todoApp').factory('todoStorage', function ($http, $q) {
  var STORAGE_ID = 'todos-angularjs';

  return {
    get: function () {
      var deferred = $q.defer();
      $http.get('/api/' + STORAGE_ID).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    put: function (todos) {
      var deferred = $q.defer();
      console.log("Storing");
      $http.put('/api/' + STORAGE_ID, JSON.stringify(todos)).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };

});