/** @jsx React.DOM */

angular.module('serveryApp').factory('Detail',['MealMenu','MenuStore', function(MealMenu, MenuStore){

var meals = ['breakfast', 'lunch', 'dinner'];

var Router = window.ReactRouter;


var Detail = React.createClass({

    getInitialState: function () {
        return {
            menu: {}
        };
    },
    getServery: function() {

        return this.props.serveries.filter(function(serv){
            return serv.name === this.props.params.serveryName;
        },this)[0];
    },
    getDate: function(){
        if (this.props.query.date)
            return new Date(this.props.query.date);
        else
            return new Date();
    },
    selectServery: function(servery, event) {
        MenuStore.setServery(servery);
    },
    openMenu: function(event) {
        event.preventDefault();
        event.stopPropagation();
    },
    componentDidMount: function(){
        var datedom = this.refs.datepicker.getDOMNode();

        $(datedom).datepicker('setDate',this.getDate());

        $(datedom).on('changeDate',function(e){
            MenuStore.setDate(e.date);
        }.bind(this)); 

        MenuStore.addListener(this.onUpdate); 

        MenuStore.initialize(this.getServery(),this.getDate());
    },
    onUpdate: function(){
        console.log("OK");
        this.setState({menu:MenuStore.getMenu()});
    },
    render: function() {
        var servery = this.getServery();
        
        return (
        <div>

        {/* Main Navbar for the App */}

        <nav className="navbar navbar-default" role="navigation">
        <div className="container">
 

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
                  
                </div>
              </form>  

              <form className="navbar-form navbar-right" role="search">

              <div className="checkbox navbar-btn">
                <label>
                    <h5 className="inline noMargin">
                        Vegetarian Only 
                        ( <img src="/static/img/vegetarian.png" className="allergyIcon inline noMargin"/> ) 
                    </h5>
                    <input type="checkbox" className="foodFilterCheckbox"/>
                </label>            
            </div>   

            <div className="checkbox navbar-btn">
                <label>
                    <h5 className="inline noMargin">
                        Gluten-free Only 
                        ( <img src="/static/img/glutenfree.png" className="allergyIcon inline noMargin"/> )
                    </h5> 
                    <input type="checkbox" className="foodFilterCheckbox"/>
                </label>          
            </div>   
          </form>       


            </div>{/* /.navbar-collapse */}
        </div>
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
            <h2> Menu </h2>

            {(!("lunch" in this.state.menu)) ? <span> Loading </span> : "no"}

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