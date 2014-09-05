(function(){

"use strict";

var NextMealsEvents = new EventEmitter();

var nextMeals = {loading:true};

var filters = {};



dispatch.factory('NextMealsStore', ['Restangular',function(Restangular) {


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
        getNextMeals: function(){
            if (nextMeals.loading)
                return nextMeals;

            return {
                day: nextMeals.day,
                meal_type: nextMeals.meal_type,
                meals: nextMeals.meals.map(function(meal){ 
                    return {
                        servery: meal.servery,
                        dishes: meal.dishes.filter(this.currentFilter)
                    }
                },this)
            }
        },
        currentFilter: function(item){
            var flags = item.allergyflags;

            function contains(flag)
            {
                return flags.indexOf(flag) !== -1;
            }

            if (filters.vegetarian){
                if (!contains("vegetarian") && !contains("vegan"))
                    return false;
            }
            if (filters.glutenfree){
                if (contains("gluten"))
                    return false;
            }

            return true;
        },
        setFilter: function(type,value){
            filters[type] = value;
            NextMealsEvents.emitEvent('nextmealsupdate');
        }
    }
}]);

})();