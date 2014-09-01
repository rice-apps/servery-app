/** @jsx React.DOM */

angular.module('serveryApp').factory('Detail',['ServerySetEvent','Menu','MenuItem', function(ServerySetEvent, Menu, MenuItem){

var meals = ['breakfast', 'lunch', 'dinner'];

  
function dayofweek(input) {
    var day;
    switch(input){
        case '0':
            day =  "Mon";
            break;
        case '1':
            day = "Tue";
            break;
        case '2':
            day = "Wed";
            break;
        case '3':
            day ="Thu";
            break;
        case '4':
            day = "Fri";
            break;
        case '5':
            day = "Sat";
            break;
        case '6':
            day = "Sun";
            break;
    }
  return day;
  }

function twelvehour(input) {
    if (input == undefined)
        return ""
    var hour = parseInt(input.substr(0,2));
    var minutes = input.substr(3,2);
    if (hour > 12){
        hour = hour - 12;
        return (hour.toString() + ":" + minutes + " PM");
   
    }
    else {
        return (finalString = hour.toString() + ":" + minutes + " AM");

    }

}


var Detail = React.createClass({

    selectServery: function(servery, event) {
        ServerySetEvent.setServery(servery);
    },
    openMenu: function() {},

    render: function() {
        return (
        <div>

        {/* Main Navbar for the App */}
        <link rel="stylesheet" href="static/css/base.css" />

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
                    { this.props.servery.fullname || "Select Servery" } <b className="caret"></b>
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
                    datepicker-popup="{{datePicker.format}}" 
                    ng-model="datePicker.dt" 
                    is-open="opened" 
                    datepicker-options="datePicker.dateOptions" 
                    ng-required="true" 
                    close-text="Close"
                    show-weeks="false" />
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
              <img src="static/img/serveries/placeholder_med.jpeg" alt="..." />
                <div className="caption">
                  <h4>{this.props.servery.fullname }</h4>
                </div>
            </div>


            {/* Servery Hours */}
            <div className="panel panel-default">
              <div className="panel-heading">
                Hours
                {
                    this.props.servery.open_now ? 
                    (<span className="label label-success">
                        Currently Open
                    </span>) :

                    (<span className="label label-default">
                        Currently Closed
                    </span>)
                }
              </div>
              <table className="table">
                <tr> {/* Meal headers */}
                  <td></td>
                  {meals.map(function(meal){
                    return (
                        <th key={meal}>{meal}</th>);
                  })}
                </tr>
                {this.props.servery.hours && Object.keys(this.props.servery.hours).map(function(period){
                    return (
                        <tr key={period}>
                          <td> {dayofweek(period)} </td>
                          {meals.map(function(meal){
                            return (
                                <td key={meal}>
                                {
                                    this.props.servery.hours[period][meal] && 
                                    (<span>
                                        {twelvehour(this.props.servery.hours[period][meal].start_time)} -  {twelvehour(this.props.servery.hours[period][meal].end_time)}
                                    </span>)
                                }
                                    
                                </td>
                                );
                          },this)}
                        </tr>
                        );
                },this)}
              </table>               
            </div>
          </div>

          {/* Right column */}
          <div className="servery col-sm-6 col-md-8">
            <h2>Menu</h2>
            {meals.slice(1).map(function(meal){
                return (
                    <div key={meal} className="menu panel panel-primary">
                        <div className="panel-heading">
                          <h3 className="panel-title">{meal}</h3>
                        </div>
                        <div className="panel-body">
                        {
                            (meal in this.props.menu) ? 
                            
                            (<ul className="list-group">
                                {this.props.menu[meal].map(function(item){
                                return (
                                    <li key={item.name} className="list-group-item">
                                        <MenuItem item={item} user={this.props.user} />
                                    </li>);
                                },this)}
                            </ul>) : 
                            (<em className="not-found">
                                No items found.
                            </em>)
                        }
                        </div>
                    </div>);
            },this)}

          </div>
        </div>
        </div>

);}

});

return Detail;

}]);