var EventEmitter = require('event-emitter');
var UserStore = require('./userstore');

"use strict";

var MenuStoreEvents = new EventEmitter();

var currentServery = {name:"north"}
var currentDate = new Date();
var currentMenu = {loading:true};

function getMenu(serveryId,isoDate){
    var menuUrl = "/api/serveries/" + serveryId + '/menu?' + $.param({date:isoDate});

    return $.get(menuUrl);
}

var MenuStore = {
    addListener: function(callback){
        MenuStoreEvents.addListener('menuupdate',callback);
    },
    removeListener: function(callback){
        MenuStoreEvents.removeListener('menuupdate',callback);
    },
    setServery: function(servery) {
        currentServery = servery;
        this.updateMenu();
        this.setUrl();
    },
    setDate: function(date){
        currentDate = date;
        this.updateMenu();
        this.setUrl();
    },
    initialize: function(servery,date){
        currentDate = date;
        currentServery = servery;
        this.updateMenu();
    },
    setUrl: function(){
        window.ReactRouter.transitionTo('detailWithServery',{serveryName:currentServery.name},{date:currentDate.toISOString()});
    },
    updateMenu: function(){

        if (typeof currentServery === "undefined")
            return;
        
        var queryId = currentServery.name;
        var queryDate = currentDate.toISOString();

        getMenu(queryId,queryDate).then(function(result){
            // Double check that this query is still valid.
            if (queryId === currentServery.name && queryDate === currentDate.toISOString())
            {
                currentMenu = result;
                MenuStoreEvents.emitEvent('menuupdate');

            }  
        });     
    },
    getMenu: function(){
        return currentMenu;
    }
};

UserStore.addListener(function(){
    MenuStore.updateMenu();
});

module.exports = MenuStore;
