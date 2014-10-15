/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

module.exports = ['MealMenu','NextMealsStore', 'AllergyFilter', 'MenuItem', 'Restangular','FilterStore',function(MealMenu, NextMealsStore, AllergyFilter, MenuItem, Restangular,FilterStore){

var meals = ['breakfast', 'lunch', 'dinner'];

var QuickViewItem = React.createClass({
    getFormattedMealItems: function(){
        var filter = FilterStore.getFilterFunction(this.props.filters);

        return this.props.meal.dishes.map(function(item){
            var classes = "list-group-item";

            if (!filter(item))
                classes += " hidden";

            return (
                <li key={item.name} className={classes}>
                    <div className="detailedMenuItem">
                        <MenuItem item={item} user={this.props.user}/>
                    </div>
                </li>
                )
        },this);

    },
    render: function() {
        
        return (
            <span className="menuThing">
                <div className="menu panel panel-primary noMarginIfRotate">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {this.props.meal.servery.fullname}
                        </h3>
                    </div>
      
                        <ul className="list-group menuItemList">
                            {this.props.meal.dishes.length == 0? 
                                <li className="list-group-item"> A meal is being served at this time, but there is no menu information available.</li> : 
                                this.getFormattedMealItems()}
                        </ul>
                    
                </div>
            </span>)
    }
});

var twelvehour = require('./utils').twelvehour

function dayOfWeekAsString(dayIndex) {
  return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var QuickView = React.createClass({
    getInitialState: function(){
        return {data:{loading:true},selected:0,filters:FilterStore.getFilters()};
    },
    componentDidMount: function(){
        NextMealsStore.addListener(this.onUpdate);
        FilterStore.addListener(this.onUpdate);

        NextMealsStore.initialize();
    },
    onUpdate: function(){
        this.setState({
            data : NextMealsStore.getNextMeals(),
            filters: FilterStore.getFilters()
        });
    },
    componentWillUnmount: function(){
        NextMealsStore.removeListener(this.onUpdate);
        FilterStore.removeListener(this.onUpdate);
    },
    selectItem: function(index){
        this.setState({selected:index});
    },
    nextMeal: function(){
        NextMealsStore.setOffset(NextMealsStore.getOffset() + 1);
    },
    previousMeal: function(){  
        NextMealsStore.setOffset(NextMealsStore.getOffset() - 1);
    },
    currentMeal: function(){
        NextMealsStore.setOffset(0);
    },
    renderServeryMenus: function(){
        return this.state.data.meals.map(function(meal,index){
            var isSelected = this.state.selected === index;
            return (
                <span key={meal.servery.name} >
                    <span className={isSelected ? "selected" : "unselected"} onMouseEnter={this.selectItem.bind(this,index)}> 
                        <QuickViewItem meal={meal} user={this.props.user} filters={this.state.filters}/>
                    </span>
                </span>)
        },this);
    },
    renderMealTime: function(){
        if (this.state.data.start_time)
        {
            return (   
                <span className="mealTime"> 
                    {twelvehour(this.state.data.start_time) +"-" + twelvehour(this.state.data.end_time)} 
                </span>)
        }
        else
            return null;

    },
    render: function() { 
        if (this.state.data.loading)
            return <span> Loading </span>

        var day = new Date(this.state.data.day);
        return (
            <div id="topHeader">
                <nav className="navbar navbar-default">
            
                      <h3 className="nav navbar-text quickViewHeader">
                        <span>
                            {dayOfWeekAsString(day.getDay()) + " " + capitaliseFirstLetter(this.state.data.meal_type)+" "} 
                        </span>
                        {this.renderMealTime()}
                      </h3>

                      <form className="navbar-right quickViewHeader">

                        <AllergyFilter allergyType="vegetarian" allergyName="Vegetarian" allergyValue={this.state.filters.vegetarian}/>  
                        <AllergyFilter allergyType="glutenfree" allergyName="Gluten-free" allergyValue={this.state.filters.glutenfree}/>  
                
                       </form>       
                </nav>
                <div className="quickViewChangeMealButtons btn-group">
                    <a role="button" onClick={this.previousMeal} className="btn btn-default"><span className="glyphicon glyphicon-chevron-left"/>Previous</a>
                    <a role="button" onClick={this.currentMeal} className="btn btn-default">Current meal</a>
                    <a role="button" onClick={this.nextMeal} className="btn btn-default">Next<span className="glyphicon glyphicon-chevron-right"/></a>
                </div>

                <div className="oneLine">
                    {this.state.data.meals.length == 0? (<h2> There are no serveries open for this meal. </h2>) : this.renderServeryMenus()}
                </div>
            </div>

            )
    }
});

return QuickView;

}];