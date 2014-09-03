/** @jsx React.DOM */

angular.module('serveryApp').factory('CreateRouter',['Main','Detail','NoServeryDetail', function(Main,Detail,NoServeryDetail){

var Routes = window.ReactRouter.Routes;
var Route = window.ReactRouter.Route;
var DefaultRoute = window.ReactRouter.DefaultRoute;
var Redirect = window.ReactRouter.Redirect;

function CreateRouter(serveries)
{
    return (
        <Routes location="history">
            <Route name="app" path="/" handler={Main} serveries={serveries}>
                <Route path="detail" handler={NoServeryDetail}/>
                <Route name="detail" path="detail/:serveryName" handler={Detail}/>
                <Redirect from="/" to="/detail" />
            </Route>
        </Routes>);
}

return CreateRouter;

}]);


