/** @jsx React.DOM */

var React = require('react');

module.exports = ['MenuStore','NextMealsStore','Restangular', function(MenuStore, NextMealsStore, Restangular){


var MenuItem = React.createClass({
    getQuery: function(type) {
        return Restangular.one("dishes",this.props.item.id).one("vote",type).customPOST();
    },
    upvote: function() {
        if (this.props.item.vote_type == "up")
        {
            this.reset();
        }
        else
        {
            this.getQuery("up").then(function(result)
            {
                MenuStore.updateMenu();
                NextMealsStore.updateMenu();
            });
        }
    },

    downvote: function() {
        if (this.props.item.vote_type == "down")
        {
            this.reset();
        }
        else
        {
            this.getQuery("down").then(function(result)
            {
                MenuStore.updateMenu();
                NextMealsStore.updateMenu();
            });
        }
    },

    reset: function() {

        this.getQuery("none").then(function(result)
        {
            MenuStore.updateMenu();
            NextMealsStore.updateMenu();
        });

    },
    render: function() {
        var cx = React.addons.classSet;
        var upClass = cx({
            'btn': true,
            'btn-default': true,
            'btn-xs': true,
            'btn-default': this.props.item.vote_type !== 'up',
            'btn-success': this.props.item.vote_type === 'up'
        });

        var downClass = cx({
            'btn': true,
            'btn-default': true,
            'btn-xs': true,
            'btn-default': this.props.item.vote_type !== 'down',
            'btn-success': this.props.item.vote_type === 'down'
        });

        var allergyIcons = [];

        function contains(array,item)
        {
            return array.indexOf(item) !== -1;
        }

        function processFoodName(name)
        {
            return toTitleCase(name);
        }

        function toTitleCase(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }

        if (contains(this.props.item.allergyflags,"vegetarian") || contains(this.props.item.allergyflags,"vegan"))
            allergyIcons.push(<img key="vegetarian" src="/static/img/allergyicons/vegetarian.svg" className="allergyIcon"/>);

        if (!contains(this.props.item.allergyflags,"gluten"))
            allergyIcons.push(<img key="gluten" src="/static/img/allergyicons/glutenfree.svg" className="allergyIcon"/>);


        function createImageLink(item)
        {

            var uri = 'https://www.google.com/search?q=' + encodeURIComponent(item)+'&tbm=isch';
            var link = React.DOM.a({href: uri}, <i className="glyphicon glyphicon-picture foodImageLink"></i> );
            
            return link
        }

        

        return (
            <div>
            
                <span>
                { processFoodName(this.props.item.name) }

                { createImageLink(this.props.item.name) }

                { allergyIcons }

                </span>

                <span className="pull-right"> 

                <button className={upClass} onClick={this.upvote}>
                <i className="glyphicon glyphicon-chevron-up"></i>
                </button>

                <span className="score">{this.props.item.score}</span>

                <button className={downClass} onClick={this.downvote}>
                <i className="glyphicon glyphicon-chevron-down"></i>
                </button>  

                </span>
            </div>);
    }
});

return MenuItem;

}];
