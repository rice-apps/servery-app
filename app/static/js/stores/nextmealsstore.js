var EventEmitter = require('events').EventEmitter;

module.exports = ['Restangular',function(Restangular) {

    "use strict";

    var NextMealsEvents = new EventEmitter();

    var nextMeals = {loading:true};

    function getNextMeals(){
        return Restangular.all("serveries").customGET("next_meals");
    }
    
    return {
        addListener: function(callback){
            NextMealsEvents.addListener('nextmealsupdate',callback);
        },
        removeListener: function(callback){
            NextMealsEvents.removeListener('nextmealsupdate',callback);
        },
        initialize: function(){
            nextMeals = {loading:true};
            NextMealsEvents.emit('nextmealsupdate');

            getNextMeals().then(function(result){
                nextMeals = result;
                NextMealsEvents.emit('nextmealsupdate');
            })
        },
        updateMenu: function(){
            getNextMeals().then(function(result){
                nextMeals = result;
                NextMealsEvents.emit('nextmealsupdate');
            })
        },
        getNextMeals: function(){
            return nextMeals;
        }
    }
}]