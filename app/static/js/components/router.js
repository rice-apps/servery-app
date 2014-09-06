/** @jsx React.DOM */

angular.module('serveryApp').factory('CreateRouter',['Main','Detail','QuickView', function(Main,Detail,QuickView){

var Routes = window.ReactRouter.Routes;
var Route = window.ReactRouter.Route;
var DefaultRoute = window.ReactRouter.DefaultRoute;
var Redirect = window.ReactRouter.Redirect;

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

return CreateRouter;

}]);


