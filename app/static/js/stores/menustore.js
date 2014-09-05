dispatch.factory('MenuStore', ['Restangular', 'FilterStore', function(Restangular, FilterStore) {

    "use strict";

    var MenuStoreEvents = new EventEmitter();

    var currentServery = {name:"north"}
    var currentDate = new Date();
    var currentMenu = {loading:true};

    FilterStore.addListener(function(){MenuStoreEvents.emitEvent('menuupdate');});

    function getMenu(serveryId,isoDate){
        return Restangular.one("serveries", serveryId).customGET("menu",{date:isoDate});
    }

    function filterMenu(menu,filterFunction){
        if (menu.loading)
            return menu;
        else
        {
            return {
                lunch: menu.lunch.filter(FilterStore.currentFilter),
                dinner: menu.dinner.filter(FilterStore.currentFilter)
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
        }
    }
}]);