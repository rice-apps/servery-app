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

dispatch.factory('ServerySetEvent',[function(){

}]);

dispatch.factory('ServerySetEvent', ['Menu',function(Menu) {
    var currentServery;
    var currentDate = new Date();

    return {
        addListener: function(callback){
            Events.addListener('serveryset',callback);
        },
        setServery: function(servery) {
            currentServery = servery;
            this.updateMenu();
        },
        setDate: function(date){
            currentDate = date;
            this.updateMenu();
        },
        updateMenu: function(){
            Menu.query({'serveryId': currentServery.id, 'date': currentDate.toISOString()},
                function(menu) {
                    Events.emitEvent('serveryset',[currentServery,menu]);
                });      
        }
    }
}]);

