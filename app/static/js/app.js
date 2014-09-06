'use strict';

var angular = require('lib/angular/angular.js');
var module = angular.module('serveryApp', ['restangular', 'serveryApi','userApi','dispatch'])

module.config(['RestangularProvider',function (RestangularProvider){
    RestangularProvider.setBaseUrl('/api');
}]);
