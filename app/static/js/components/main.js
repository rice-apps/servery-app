/** @jsx React.DOM */
var angular = require('lib/angular/angular.js');
var React= require('lib/react.js');
var angular = require('angular');
angular.module('serveryApp').factory('Main',['Header','Detail','User', 'LoginEvent','MenuStore', function(Header, Detail, User, LoginEvent, MenuStore){

var f =[
    {fullname: "foo"},
    {fullname: "blah"}
]

var Main = React.createClass({
    render: function() {
        return (
            <div>

                <Header user={this.state.user}/>
                <div className="container">

                    <div id ="page-content">
                        <this.props.activeRouteHandler serveries={this.props.serveries} user={this.state.user}/>
                    </div>
                    
                    <Footer />
                </div>
            </div>
        );
    },

    getInitialState: function() {
        return {
            user: null,
            servery: {},
            menu: {}
        };
    },

    setUser: function(user) {
        this.setState({user:user});
    },

    setServeryAndMenu: function(servery,menu) {
        this.setState({servery:servery,menu:menu});
    },
    componentDidMount: function() {

        User.current_user(function (done){
            this.setUser(done);
        }.bind(this));

        LoginEvent.addListener(function (user){
            MenuStore.updateMenu();
            this.setUser(user);
        }.bind(this));


    }

});


return Main;

}]);

angular.element(document).ready(function() {
      angular.bootstrap(document, ['serveryApp']);
});

