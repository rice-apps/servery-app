/** @jsx React.DOM */

var React = require('react');
var UserStore = require('../stores/userstore');

var LoginStatus = React.createClass({
    closeMenu: function(){
        var navbar_toggle = $('#navbar-main-toggle.navbar-toggle');
        if (navbar_toggle.is(':visible')) {
            navbar_toggle.trigger('click');
        }
    },
    render: function(){

        var links;
        if (this.props.user !== null && this.props.user.username)
        {
            links = [
                <li key="userid"><a onClick={this.closeMenu}>{this.props.user.username}</a> </li>,
                <li key="logout"><a href="#" onClick={this.logout}> Logout </a></li>
            ]

        }
        else
        {
            links = [
                <li key="login"><a href="/api/auth/login">Login</a></li>
            ]
        }

        return (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="https://trello.com/b/5cVHeknd/serveryappboard" onClick={this.closeMenu} target="_blank">Feedback</a></li>

                {links}
            </ul>
        );
    },

    logout: function(event){
        event.preventDefault();
        UserStore.logout();
        this.closeMenu();
    }
});

module.exports = LoginStatus;
