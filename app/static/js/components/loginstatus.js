/** @jsx React.DOM */

angular.module('serveryApp').factory('LoginStatus',[ 'LoginEvent','User',function(LoginEvent,User){


var LoginStatus = React.createClass({
    render: function(){

        var links;
        if (this.props.user !== null && "username" in this.props.user)
        {
            links = [
                <li key="settings"><a href="#/userSettings">{this.props.user.username}</a> </li>,
                <li key="logout" onClick={this.logout}><a> Logout </a></li>
            ]

        }
        else
        {
            links = [
                <li key="login"><a href="/auth/login">Login</a></li>
            ]
        }

        return (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="http://csclub.rice.edu/riceapps" target="_blank">Built by Rice Apps</a></li>

                {links}
            </ul>
        );
    },

    logout: function(){
        User.logout(function(){
            LoginEvent.setUser(null);
        });
        
        

    }
});

return LoginStatus;

}]);