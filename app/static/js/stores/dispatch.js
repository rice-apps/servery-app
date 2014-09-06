'use strict';
var angular = require('lib/angular/angular.js');
var filterstore = require('filterstore.js');
var menustore= require('menustore.js');
var nextmealsstore= require('nextmealsstore.js');
var dispatch = angular.module('dispatch', []);

var Events = new EventEmitter();

dispatch.factory('LoginEvent', [function() {
    return {
        addListener: function(callback){
            Events.addListener('login',callback);
        },
        setUser: function(user) {
            Events.emitEvent('login',[user]);
        }
    }
}]);
