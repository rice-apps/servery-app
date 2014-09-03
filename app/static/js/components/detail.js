/** @jsx React.DOM */

angular.module('serveryApp').factory('Detail',['ServerySetEvent','Menu','MealMenu','Restangular', function(ServerySetEvent, Menu, MealMenu, Restangular){

var meals = ['breakfast', 'lunch', 'dinner'];

var Router = window.ReactRouter;

function getMenu(serveryId,isoDate){
    return Restangular.one("serveries", serveryId).customGET("menu",{date:isoDate}).then(function(result){
        result.serveryId = serveryId;
        result.isoDate = isoDate;
        return result;
    });
}

var Detail = React.createClass({

    loadMenu: function(serveryName,date){
        window.ReactRouter.transitionTo('detail',{serveryName:serveryName},{date:date});
        getMenu(serveryName,date).then(function(result){
            console.log(result);
            this.setState({menu:result});
        }.bind(this))
    },

    getInitialState: function () {
        this.loadMenu(this.props.params.serveryName,this.props.query.date);

        return {
            menu: {}
        };
    },

    selectServery: function(servery, event) {
        
        this.loadMenu(servery.name,this.props.query.date);
    },
    openMenu: function(event) {
        event.preventDefault();
        event.stopPropagation();
    },
    componentDidMount: function(){
        var datedom = this.refs.datepicker.getDOMNode();

        $(datedom).on('changeDate',function(e){
            this.loadMenu(this.props.params.serveryName,e.date.toISOString());
        }.bind(this));  
    },
    render: function() {

        var servery = this.props.serveries.filter(function(serv){
            return serv.name === this.props.params.serveryName;
        },this)[0];
        return (
        <div>

        {/* Main Navbar for the App */}

        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">

            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button 
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
            </div>

            {/* Selection bar */}

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" >

              <ul className="nav navbar-nav">
                <li className="dropdown">
                  {/* Select servery button */}
                  <a 
                    href="#" 
                    className="dropdown-toggle" 
                    data-toggle="dropdown">
                    { servery.fullname} <b className="caret"></b>
                  </a>



                  {/* List of serveries for the dropdown menu */}
                  <ul className="dropdown-menu">
                    {this.props.serveries.map(function(servery){
                        return (
                            <li key={servery.fullname}>
                                <a onClick={this.selectServery.bind(this,servery)}>{servery.fullname}</a>
                            </li>);
                    },this)}
                  </ul>
                </li>
              </ul>

              <form className="navbar-form navbar-left">
                <div>
                  {/* Datepicker */}
                  <input 
                    type="text"
                    style={{width: "205px"}} 
                    className="form-control" 
                    data-provide="datepicker"
                    data-date-autoclose="true"
                    ref="datepicker"
                    />
                  {/* Datepicker button */}
                  <button 
                    className="btn btn-default" 
                    onClick={this.openMenu}>
                      <i className="glyphicon glyphicon-calendar"></i>
                  </button>
                  {/* Lunch / Dinner toggle */}
                  <div className="btn-group">
                   <button type="button" className="btn btn-default">Lunch</button>

                   <button type="button" className="btn btn-default">Dinner</button>
                  </div> 
                </div>
              </form>

              {/* Search bar */}

              <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>{/* /.navbar-collapse */}

          </div>{/* /.container-fluid */}
        </nav>



        {/* Meal Information */}
        <div className="row">

          {/* Left column */}
          <div className="servery-info col-sm-6 col-sm-4">

            {/* Servery Thumbnail */}
            <div className="thumbnail">
              <img src="/static/img/serveries/placeholder_med.jpeg" alt="..." />
                <div className="caption">
                  <h4>{servery.fullname} </h4>
                </div>
            </div>


            <ServeryHours servery={servery}/>
          </div>

          {/* Right column */}
          <div className="servery col-sm-6 col-md-8">
            <h2>Menu</h2>

            {meals.slice(1).map(function(meal){
                return <MealMenu key={meal} meal={meal} menuitems={this.state.menu[meal]} user={this.props.user}/>;
            },this)}

          </div>
        </div>
        </div>

);}

});

return Detail;

}]);