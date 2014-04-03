'use strict';

var serveryServices = angular.module('serveryServices', ['ngResource']);

serveryServices.factory('Servery', ['$resource', function($resource) {
  return $resource(
    'api/serveries/:serveryId',
    {},
    {
      all: {method: 'GET', params: {}, isArray: true},
      query:{method: 'GET', params: {serveryId:'serveryId'}}
    });
}]);