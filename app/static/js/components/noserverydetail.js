/** @jsx React.DOM */

angular.module('serveryApp').factory('NoServeryDetail',['ServerySetEvent','Menu','MealMenu', function(ServerySetEvent, Menu, MealMenu){

var meals = ['breakfast', 'lunch', 'dinner'];



var NoServeryDetail = React.createClass({

    selectServery: function(servery, event) {
        window.ReactRouter.transitionTo('detail',{serveryName:servery.name},{date:this.props.query.date});
    },
    openMenu: function(event) {
        event.preventDefault();
        event.stopPropagation();
    },
    componentDidMount: function(){
        var datedom = this.refs.datepicker.getDOMNode();

        $(datedom).on('changeDate',function(e){
            console.log(e);
            window.ReactRouter.transitionTo('noserverydetail',{},{date:e.toISOString()});
        });
    },
    render: function() {
        console.log(this.props); 
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
                    { "Select Servery" } <b className="caret"></b>
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



        
        </div>

);}

});

return NoServeryDetail;

}]);