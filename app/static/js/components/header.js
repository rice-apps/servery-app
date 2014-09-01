/** @jsx React.DOM */

angular.module('serveryApp').factory('Header',['LoginStatus', function(LoginStatus){


var Header = React.createClass({
    render: function() {
        return (

            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">


                    <div className="navbar-header">
                        <a href="#/" className="navbar-brand">Servery App</a>

                        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                    </div>

                    <div className="navbar-collapse collapse" id="navbar-main">
                        <LoginStatus user={this.props.user}/>
                    </div>
                </div>
            </div>
        )
    }
});

return Header;

}]);