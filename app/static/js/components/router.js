/** @jsx React.DOM */


var React = require('react');
var ReactRouter = require('react-router');

var Upload = React.createClass({
    render: function() {
        return (
            <form action="/api/upload" method="post" encType="multipart/form-data" role="form">
              <div className="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile" name="aFile"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>);
    }
});


module.exports = ['Main','Detail','QuickView', function(Main,Detail,QuickView){

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
                <Route name="upload" handler={Upload} />
                <Route name="quickview" handler={QuickView}/>
                <Redirect to="quickview" />
                
            </Route>
        </Routes>);
}

return CreateRouter;

}]


