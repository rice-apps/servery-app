dispatch.factory('FilterStore', [function() {

    var FilterStoreEvents = new EventEmitter();
    var filters = {};


    return {
        addListener: function (callback){
            FilterStoreEvents.addListener('filterupdate',callback);
        },
        removeListener: function (callback){
            FilterStoreEvents.removeListener('filterupdate',callback);
        },
        getFilterFunction: function(filters){
            return function(item){
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
            }
        },
        getFilters: function(){
            return filters;
        },
        setFilter: function(type,value){
            filters[type] = value;
            FilterStoreEvents.emitEvent('filterupdate');
        }
    }
    
}]);