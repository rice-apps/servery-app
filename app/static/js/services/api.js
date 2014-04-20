/*global todomvc */
'use strict';

/**
 * Services that provide access to the servery API.
 */
var serveryApi = angular.module('serveryApi', ['ngResource']);

serveryApi.factory('Servery', ['$resource', function($resource) {
  return $resource(
    'api/serveries/:serveryId',
    {},
    {
      all: {method: 'GET', params: {}, isArray: true},
      query:{method: 'GET', params: {serveryId:'serveryId'}}
    });
}]);

serveryApi.factory('Menu', ['$resource', function($resource) {
  return $resource(
    'api/serveries/:serveryId/menu',
    {},
    {
            query: {method: 'GET', params: {serveryId:'serveryId',date:"no date provided"}}
    });
}]);
