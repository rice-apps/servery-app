(function(){
"use strict";

var MenuStoreEvents = new EventEmitter();

var currentServery = {name:"north"}
var currentDate = new Date();
var currentMenu = {loading:true};

var filters = {};



dispatch.factory('MenuStore', ['Restangular',function(Restangular) {


    function getMenu(serveryId,isoDate){
        return Restangular.one("serveries", serveryId).customGET("menu",{date:isoDate});
    }

    function filterMenu(menu,filterFunction){
        if (menu.loading)
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
            //currentMenu = {loading:true};
            //MenuStoreEvents.emitEvent('menuupdate');

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

})();