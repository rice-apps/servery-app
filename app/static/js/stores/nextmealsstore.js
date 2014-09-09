var EventEmitter = require('event-emitter');

module.exports = ['Restangular','LoginEvent', function(Restangular, LoginEvent) {

    "use strict";

    

    var NextMealsEvents = new EventEmitter();

    var nextMeals = {loading:true};

    function getNextMeals(){
        return Restangular.all("serveries").customGET("next_meals");
    }
    
    var result =  {
        addListener: function(callback){
            NextMealsEvents.addListener('nextmealsupdate',callback);
        },
        removeListener: function(callback){
            NextMealsEvents.removeListener('nextmealsupdate',callback);
        },
        initialize: function(){
            nextMeals = {loading:true};
            NextMealsEvents.emitEvent('nextmealsupdate');

            getNextMeals().then(function(result){
                nextMeals = result;
                NextMealsEvents.emitEvent('nextmealsupdate');
            })
        },
        updateMenu: function(){
            getNextMeals().then(function(result){
                nextMeals = result;
                NextMealsEvents.emitEvent('nextmealsupdate');
            })
        },
        getNextMeals: function(){
            return nextMeals;
        }
    }

    LoginEvent.addListener(function(){
        result.updateMenu();
    });

    return result;
}]