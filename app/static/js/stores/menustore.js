"use strict";

var MenuStoreEvents = new EventEmitter();

var currentServery = "north";
var currentDate = new Date();
var currentMenu = {};

var filters = {};



dispatch.factory('MenuStore', ['Restangular',function(Restangular) {


    function getMenu(serveryId,isoDate){
        return Restangular.one("serveries", serveryId).customGET("menu",{date:isoDate});
    }

    function filterMenu(menu,filterFunction){
        if (!("lunch" in menu))
            return menu;
        else
        {
            return {
                lunch: menu.lunch.filter(filterFunction),
                dinner: menu.dinner.filter(filterFunction)
            };
        }
    }

    return {
        addListener: function(callback){
            MenuStoreEvents.addListener('menuupdate',callback);
        },
        setServery: function(servery) {
            currentServery = servery;
            this.updateMenu();
        },
        setDate: function(date){
            currentDate = date;
            this.updateMenu();
        },
        initialize: function(servery,date){
            currentDate = date;
            currentServery = servery;
            this.updateMenu();
        },
        updateMenu: function(){
            currentMenu = {};
            MenuStoreEvents.emitEvent('menuupdate');

            if (typeof currentServery === "undefined")
                return;

            window.ReactRouter.transitionTo('detail',{serveryName:currentServery.name},{date:currentDate.toISOString()});

            var queryId = currentServery.id;
            var queryDate = currentDate.toISOString();

            getMenu(queryId,queryDate).then(function(result){
                // Double check that this query is still valid.
                if (queryId === currentServery.id && queryDate === currentDate.toISOString())
                {
                    currentMenu = result;
                    MenuStoreEvents.emitEvent('menuupdate');

                }  
            });     
        },
        getMenu: function(){
            return filterMenu(currentMenu,this.currentFilter);
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
            MenuStoreEvents.emitEvent('menuupdate');
        }
    }
}]);
