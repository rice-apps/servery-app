/** @jsx React.DOM */

angular.module('serveryApp').factory('Main',['Header','Detail', function(Header, Detail){

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
                        <Detail serveries={this.props.serveries} servery={this.state.servery} menu={this.state.menu} user={this.state.user}/>
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
    }

});


return Main;

}]);

angular.element(document).ready(function() {
      angular.bootstrap(document, ['serveryApp']);
});

