/*global todomvc */
'use strict';

/**
 * Services that retrieves serveries from localStorage
 */
angular.module('serveryApp').factory('dataService', function ($http, $q) {
  var STORAGE_ID = 'serveries-angularjs';

  return {
    get: function () {
      var deferred = $q.defer();
      $http.get('/api/' + STORAGE_ID).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };

});