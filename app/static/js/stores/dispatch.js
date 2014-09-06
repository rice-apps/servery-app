'use strict';
var angular = require('angular');

var dispatch = angular.module('dispatch', ['restangular'])
.config(['RestangularProvider',function (RestangularProvider){
     RestangularProvider.setBaseUrl('/api');
}])
.factory('FilterStore',require('./filterstore'))
.factory('MenuStore'  ,require('./menustore'))
.factory('NextMealsStore', require('./nextmealsstore'))

var EventEmitter = require('events').EventEmitter;


dispatch.factory('LoginEvent', [function() {

    var Events = new EventEmitter();

    return {
        addListener: function(callback){
            Events.addListener('login',callback);
        },
        setUser: function(user) {
            Events.emit('login',[user]);
        }
    }
}]);
