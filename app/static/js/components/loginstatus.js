/** @jsx React.DOM */

var React = require('react');

module.exports = [ 'LoginEvent','User',function(LoginEvent,User){

var LoginStatus = React.createClass({
    closeMenu: function(){
        var navbar_toggle = $('#navbar-main-toggle.navbar-toggle');
        if (navbar_toggle.is(':visible')) {
            navbar_toggle.trigger('click');
        }
    },
    render: function(){

        var links;
        if (this.props.user !== null && "username" in this.props.user)
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
                <li><a href="http://csclub.rice.edu/riceapps" onClick={this.closeMenu} target="_blank">Built by Rice Apps</a></li>

                {links}
            </ul>
        );
    },

    logout: function(event){
        event.preventDefault();
        User.logout(function(){
            LoginEvent.setUser(null);
        });
        
        this.closeMenu();
    }
});

return LoginStatus;

}]
