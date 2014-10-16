var EventEmitter = require('event-emitter');
var UserStore = require('./userstore');

"use strict";

var NextMealsEvents = new EventEmitter();

var nextMeals = {loading:true};

var offset=0;

function getNextMeals(){
    var nextMealsUrl = '/api/serveries/next_meals?' + $.param({offset:offset});

    return $.get(nextMealsUrl);
}

var NextMealsStore = {
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
    },
    setOffset: function(newOffset){
        offset = newOffset;
        this.updateMenu();
    },
    getOffset: function(){
        return offset;
    }
}

UserStore.addListener(function(){
    NextMealsStore.updateMenu();
});

module.exports = NextMealsStore;