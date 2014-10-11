/** @jsx React.DOM */

var React = require('react');

module.exports = ['MenuStore','NextMealsStore','Restangular', function(MenuStore, NextMealsStore, Restangular){


var MenuItem = React.createClass({
    render: function() {

        function processFoodName(name)
        {
            return toTitleCase(name);
        }

        function toTitleCase(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }


        function createImageLink(item)
        {

            var uri = 'https://www.google.com/search?q=' + encodeURIComponent(item)+'&tbm=isch';
            var link = (<a href={uri}><i className="glyphicon glyphicon-picture foodImageLink"></i></a>);
            
            return link
        }
       
        return (
            <div>
            
                <span>
                { processFoodName(this.props.item.name) }

                { createImageLink(this.props.item.name) }

                </span>
            </div>);
    }
});

return MenuItem;

}];
