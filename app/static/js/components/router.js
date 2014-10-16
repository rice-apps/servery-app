/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-router');

var Detail = require('./detail');
var QuickView = require('./quickview');
var Main = require('./main');

var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Redirect = ReactRouter.Redirect;

var Pass = React.createClass({
    render: function() {
        return <this.props.activeRouteHandler serveries={this.props.serveries} user={this.props.user}/>
    }
});

function CreateRouter(serveries)
{
    return (
        <Routes location="history">
            <Route name="app" path="/" handler={Main} serveries={serveries}>
                <Route name="detail" handler={Pass}>
                    <Route path="" handler={Detail} />
                    <Route path=":serveryName" name="detailWithServery" handler={Detail} />
                </Route>
                <Route name="quickview" handler={QuickView}/>
                <Redirect to="quickview" />
            </Route>
        </Routes>);
}

module.exports = CreateRouter;


