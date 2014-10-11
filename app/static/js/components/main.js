/** @jsx React.DOM */

var React = require('react');

var Footer = require('./footer');

module.exports = ['Header','Detail','User', 'LoginEvent','MenuStore', function(Header, Detail, User, LoginEvent, MenuStore){

var Main = React.createClass({

    getDisclaimer: function () {
        if (this.state.disclaimerExpanded)
            return "Warning: This is not official Rice University Dining information. In particular, allergy information might be inaccurate.";
        else
            return "Warning: ...";
    },

    render: function() {
        return (
            <div>

                <Header user={this.state.user}/>
                <div className="container">

                    <div id ="page-content">
                        <h3 onClick={this.toggleDisclaimer}><span className="label label-warning disclaimer">{this.getDisclaimer()}</span></h3>
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
            menu: {},
            disclaimerExpanded: false
        };
    },

    setUser: function(user) {
        this.setState({user:user});
    },

    toggleDisclaimer: function() {
        this.setState({disclaimerExpanded:!this.state.disclaimerExpanded});
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

