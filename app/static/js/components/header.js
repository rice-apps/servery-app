/** @jsx React.DOM */

angular.module('serveryApp').factory('Header',['LoginStatus', function(LoginStatus){

var ActiveState = window.ReactRouter.ActiveState;

var Link = window.ReactRouter.Link;

var Tab = React.createClass({

  mixins: [ ActiveState ],

  getInitialState: function () {
    return { isActive: false };
  },

  updateActiveState: function () {
    this.setState({
      isActive: Tab.isActive(this.props.to, this.props.params, this.props.query)
    })
  },

  render: function() {
    var className = this.state.isActive ? 'active' : '';
    var link = Link(this.props);
    return <li className={className}>{link}</li>;
  }

});

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

                        <ul className="nav navbar-nav">
                            <Tab to="quickview"> Next Meal </Tab>
                            <Tab to="detail"> Menu Browser </Tab>
                        </ul>
                        
                        <LoginStatus user={this.props.user}/>
                    </div>
                </div>
            </div>
        )
    }
});

return Header;

}]);