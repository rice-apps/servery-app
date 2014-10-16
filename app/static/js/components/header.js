/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-router');

var LoginStatus = require('./loginstatus');


var ActiveState = ReactRouter.ActiveState;

var Link = ReactRouter.Link;

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

    closeMenu: function(){
        var navbar_toggle = $('#navbar-main-toggle.navbar-toggle');
        if (navbar_toggle.is(':visible')) {
            navbar_toggle.trigger('click');
        }
    },
    render: function() {
        return (

            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">


                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">Servery App</a>

                        <button id="navbar-main-toggle" className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                    </div>

                    <div className="navbar-collapse collapse" id="navbar-main">

                        <ul className="nav navbar-nav">
                            <Tab to="quickview" onClick={this.closeMenu}> Next Meal </Tab>
                            <Tab to="detail" onClick={this.closeMenu}> Servery Information </Tab>
                        </ul>
                        
                        <LoginStatus user={this.props.user}/>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Header;