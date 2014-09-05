/** @jsx React.DOM */

angular.module('serveryApp').factory('MenuItem',['ServerySetEvent','Vote', function(ServerySetEvent, Vote){

var MenuItem = React.createClass({
    upvote: function() {
        if (this.props.item.vote_type == "up")
        {
            this.reset();
        }
        else
        {
            Vote.upvote({dishId:this.props.item.id},function(result)
            {
                ServerySetEvent.updateMenu();
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
            Vote.downvote({dishId:this.props.item.id},function(result)
            {
                ServerySetEvent.updateMenu();
            });
        }
    },

    reset: function() {

        Vote.reset({dishId:this.props.item.id},function(result)
        {
            ServerySetEvent.updateMenu();
        });

    },
    render: function() {
        var cx = React.addons.classSet;
        var upClass = cx({
            'btn': true,
            'btn-default': true,
            'btn-xs': true,
            'btn-default': this.props.item.vote_type !== 'up',
            'btn-success': this.props.item.vote_type === 'up',
            'invisible': this.props.user === null || !("username" in this.props.user)
        });

        var downClass = cx({
            'btn': true,
            'btn-default': true,
            'btn-xs': true,
            'btn-default': this.props.item.vote_type !== 'down',
            'btn-success': this.props.item.vote_type === 'down',
            'invisible': this.props.user === null || !("username" in this.props.user)
        });

        var allergyIcons = [];

        function contains(array,item)
        {
            return array.indexOf(item) !== -1;
        }

        if (contains(this.props.item.allergyflags,"vegetarian") || contains(this.props.item.allergyflags,"vegan"))
            allergyIcons.push(<img key="vegetarian" src="/static/img/vegetarian.png" className="allergyIcon"/>);

        if (!contains(this.props.item.allergyflags,"gluten"))
            allergyIcons.push(<img key="gluten" src="/static/img/glutenfree.png" className="allergyIcon"/>);

        return (
            <div>
                <span>
                { this.props.item.name }

                { allergyIcons }

                </span>

                <span className="pull-right"> 

                <a className={upClass} onClick={this.upvote} >
                <i className="glyphicon glyphicon-chevron-up"></i>
                </a>

                <span className="score">{this.props.item.score}</span>

                <a className={downClass} onClick={this.downvote} >
                <i className="glyphicon glyphicon-chevron-down"></i>
                </a>  

                </span>
            </div>);
    }
});

return MenuItem;

}]);