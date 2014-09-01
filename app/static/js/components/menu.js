/** @jsx React.DOM */

angular.module('serveryApp').factory('MealMenu',['MenuItem', function(MenuItem){


var MealMenu = React.createClass({
    render: function(){
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
                        return (
                            <li key={item.name} className="list-group-item">
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