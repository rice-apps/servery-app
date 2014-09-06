/*global todomvc */
'use strict';
var angular = require('lib/angular/angular.js');
/**
 * Services that provide access to the servery API.
 */
var serveryApi = angular.module('serveryApi', ['ngResource']);

serveryApi.factory('Servery', ['$resource', function($resource) {
  return $resource(
    '/api/serveries/:serveryId',
    {},
    {
      all: {method: 'GET', params: {}},
    });
}]);


var userApi = angular.module('userApi', ['ngResource']);

userApi.factory('User', ['$resource', function($resource) {
        return $resource(
            '/api/user',
            {},
            {
                current_user: {method: 'GET' },
                save: {method: 'POST'},
                logout: {method : 'POST', url: '/auth/logout'}
            });
}]);
                    
