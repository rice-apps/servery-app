'use strict';


var module = angular.module('serveryApp', ['restangular', 'serveryApi','userApi','dispatch'])
console.log(module);

module.config(['RestangularProvider',function (RestangularProvider){
    RestangularProvider.setBaseUrl('/api');
}]);