'use strict';

var angular = require('angular');

var serveryApi = require('./services/api');
//var dispatch = require('./stores/dispatch');

var serveryComponents = require('./components/serverycomponents');

var module = angular.module('serveryApp', ['serveryApi','serveryComponents'])

// module.config(['RestangularProvider',function (RestangularProvider){
//     RestangularProvider.setBaseUrl('/api');
// }]);

module.controller('RootController',require('./controllers/root'))
