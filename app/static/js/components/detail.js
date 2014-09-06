/** @jsx React.DOM */

var Router = require('react-router');
var React = require('react');

module.exports = ['MealMenu','MenuStore', 'AllergyFilter','FilterStore', function(MealMenu, MenuStore, AllergyFilter, FilterStore){

var meals = ['breakfast', 'lunch', 'dinner'];


var Detail = React.createClass({

    getInitialState: function () {
        return {
            menu: {}, 
            filters: FilterStore.getFilters()
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
        FilterStore.addListener(this.onUpdate); 

        MenuStore.initialize(this.getServery(),this.getDate());
    },
    componentWillUnmount: function(){
        MenuStore.removeListener(this.onUpdate);
        FilterStore.removeListener(this.onUpdate);
    },
    onUpdate: function(){
        this.setState({menu:MenuStore.getMenu(), filters: FilterStore.getFilters()});
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
                <a 
                  className="navbar-brand visible-xs-block">
                  { servery ? servery.fullname : "Select Servery"}
                </a>

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
                    { servery ? servery.fullname : "Select Servery"} <b className="caret"></b>
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

                    <AllergyFilter allergyType="vegetarian" allergyName="Vegetarian" allergyValue={this.state.filters.vegetarian}/>  
                    <AllergyFilter allergyType="glutenfree" allergyName="Gluten-free" allergyValue={this.state.filters.glutenfree}/>  
 
               </form>       

            </div>{/* /.navbar-collapse */}
        </div>
        </nav>

        {/* Meal Information */}
        { servery && (
        
        <div className="row">

          {/* Left column */}
          <div className="servery-info col-sm-6 col-sm-4">

            {/* Servery Thumbnail */}
            <div className="thumbnail">
              <img src={"/static/img/serveries/"+servery.name+".jpg"} alt="..." />
                <div className="caption">
                  <h4>{servery.fullname} </h4>
                </div>
            </div>


            <ServeryHours servery={servery}/>
          </div>

          {/* Right column */}
          <div className="servery col-sm-6 col-md-8">
            <h2> Menu </h2>
            
            {meals.slice(1).map(function(meal){
                return <MealMenu key={meal} meal={meal} menuitems={this.state.menu[meal]} user={this.props.user} filters={this.state.filters}/>;
            },this)}

          </div>
        </div>)}
        </div>

);}

});

return Detail;

}];
