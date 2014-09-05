'use strict';

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