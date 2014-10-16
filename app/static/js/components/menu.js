/** @jsx React.DOM */

var React = require('react');
var FilterStore = require('../stores/filterstore');

var MenuItem = require('./menuitem');

var MealMenu = React.createClass({
    render: function(){
        var filter = FilterStore.getFilterFunction(this.props.filters);

        return (
            <div className="menu panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">{this.props.meal}</h3>
                </div>
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
                    (<div className="panel-body"> 
                        <em className="not-found">
                            No items found.
                        </em>
                    </div>)
                }
            </div>
            );
    }
});

module.exports = MealMenu;