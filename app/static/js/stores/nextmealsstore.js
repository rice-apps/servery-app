dispatch.factory('NextMealsStore', ['Restangular',function(Restangular) {

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
}]);