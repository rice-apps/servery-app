dispatch.factory('NextMealsStore', ['Restangular','FilterStore',function(Restangular,FilterStore) {

    "use strict";

    var NextMealsEvents = new EventEmitter();

    var nextMeals = {loading:true};

    function getNextMeals(){
        return Restangular.all("serveries").customGET("next_meals");
    }

    FilterStore.addListener(function(){NextMealsEvents.emitEvent('nextmealsupdate')});

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
        getNextMeals: function(){
            if (nextMeals.loading)
                return nextMeals;

            return {
                day: nextMeals.day,
                meal_type: nextMeals.meal_type,
                meals: nextMeals.meals.map(function(meal){ 
                    return {
                        servery: meal.servery,
                        dishes: meal.dishes.filter(FilterStore.currentFilter)
                    }
                })
            }
        }
    }
}]);