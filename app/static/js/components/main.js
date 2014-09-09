/** @jsx React.DOM */

var React = require('react');

var Footer = require('./footer');

module.exports = ['Header','Detail','User', 'LoginEvent','MenuStore', function(Header, Detail, User, LoginEvent, MenuStore){

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

                <div className="modal fade login-vote-modal" tabindex="-1" role="dialog" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p> You need to login to vote: <a href="/api/auth/login">Login</a> <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button> </p>

                        </div>
                    </div>
                  </div>
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

}];

