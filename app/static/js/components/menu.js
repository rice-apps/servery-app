/** @jsx React.DOM */

angular.module('serveryApp').factory('MealMenu',['MenuItem', 'FilterStore', function(MenuItem, FilterStore){


var MealMenu = React.createClass({
    render: function(){
        var filter = FilterStore.getFilterFunction(this.props.filters);

        return (
            <div className="menu panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">{this.props.meal}</h3>
                </div>
                <div className="panel-body">
                {
                    (this.props.menuitems && this.props.menuitems.length !== 0) ? 
                    
                    (<ul className="list-group">
                        {this.props.menuitems.map(function(item){
                            var classes = "list-group-item menuItem";

                            if (!filter(item))
                                        classes += " hidden";
                            return (
                                <li key={item.name} className={classes}>
                                    <MenuItem item={item} user={this.props.user} />
                                </li>);
                            },this)}
                    </ul>) : 
                    (<em className="not-found">
                        No items found.
                    </em>)
                }
                </div>
            </div>
            );
    }
});

return MealMenu;

}]);