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

dispatch.factory('ServerySetEvent', ['Menu',function(Menu) {
    var currentServery;

    return {
        addListener: function(callback){
            Events.addListener('serveryset',callback);
        },
        setServery: function(servery) {
            currentServery = servery;
            this.updateMenu();
        },
        updateMenu: function(){
            Menu.query({'serveryId': currentServery.id},
                function(menu) {
                    Events.emitEvent('serveryset',[currentServery,menu]);
                });      
        }
    }
}]);

