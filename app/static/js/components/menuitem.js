/** @jsx React.DOM */

var React = require('react');

var MenuStore = require('../stores/menustore');
var NextMealsStore = require('../stores/nextmealsstore');

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
            var link = (<a href={uri} target="_blank"><i className="glyphicon glyphicon-picture foodImageLink"></i></a>);
            
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

module.exports = MenuItem;
