/** @jsx React.DOM */

angular.module('serveryApp').factory('QuickView',['MealMenu','NextMealsStore', 'AllergyFilter', 'MenuItem', 'Restangular',function(MealMenu, NextMealsStore, AllergyFilter, MenuItem, Restangular){

var meals = ['breakfast', 'lunch', 'dinner'];

var Router = window.ReactRouter;

var QuickViewItem = React.createClass({
    render: function() {
        return (
            <span className="menuThing">
                <div className="menu panel panel-primary noMarginIfRotate">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {this.props.meal.servery.fullname}
                        </h3>
                    </div>
                    <div className="panel-body menuItemList">
                        <ul className="list-group">
                            {this.props.meal.dishes.map(function(item){
                                return (
                                    <li key={item.name} className="list-group-item row">
                                        <div className="detailedMenuItem">
                                            <MenuItem item={item} user={this.props.user}/>
                                        </div>
                                    </li>
                                    )
                            },this)}
                        </ul>
                    </div>
                </div>
            </span>)
    }
});


function dayOfWeekAsString(dayIndex) {
  return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var QuickView = React.createClass({
    getInitialState: function(){
        return {data:{loading:true},selected:0};
    },
    componentDidMount: function(){
        NextMealsStore.addListener(this.onUpdate);

        NextMealsStore.initialize();
    },
    onUpdate: function(){
        this.setState({data:NextMealsStore.getNextMeals()})
    },
    componentWillUnmount: function(){
        NextMealsStore.removeListener(this.onUpdate);
    },
    selectItem: function(index){
        this.setState({selected:index});
    },
    render: function() { 
        if (this.state.data.loading)
            return <span> Loading </span>

        var day = new Date(this.state.data.day);
        return (
            <div id="topHeader">
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

                      <h3 className="nav navbar-text">
                        {dayOfWeekAsString(day.getDate())} {capitaliseFirstLetter(this.state.data.meal_type)}
                      </h3>

                      <form className="navbar-form navbar-right" role="search">

                        <AllergyFilter allergyType="vegetarian" allergyName="Vegetarian"/>  
                        <AllergyFilter allergyType="glutenfree" allergyName="Gluten-free"/>  
                
                       </form>       

                    </div>{/* /.navbar-collapse */}
                </div>
                </nav>

                <div className="oneLine">
                    {this.state.data.meals.map(function(meal,index){
                        var isSelected = this.state.selected === index;
                        return (
                            <span key={meal.servery.name} >
                                <span className={isSelected ? "selected" : "unselected"} onMouseEnter={this.selectItem.bind(this,index)}> 
                                    <QuickViewItem meal={meal} user={this.props.user} />
                                </span>
                            </span>)
                    },this)}
                </div>
            </div>

            )
    }
});

return QuickView;

}]);