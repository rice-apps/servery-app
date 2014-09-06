/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

module.exports = ['MealMenu','NextMealsStore', 'AllergyFilter', 'MenuItem', 'Restangular','FilterStore',function(MealMenu, NextMealsStore, AllergyFilter, MenuItem, Restangular,FilterStore){

var meals = ['breakfast', 'lunch', 'dinner'];

var QuickViewItem = React.createClass({
    render: function() {
        var filter = FilterStore.getFilterFunction(this.props.filters);
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
                                var classes = "list-group-item row";

                                if (!filter(item))
                                    classes += " hidden";

                                return (
                                    <li key={item.name} className={classes}>
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
    render: function() { 
        if (this.state.data.loading)
            return <span> Loading </span>

        var day = new Date(this.state.data.day);
        return (
            <div id="topHeader">
                <nav className="navbar navbar-default">
            
                      <h3 className="nav navbar-text quickViewHeader">
                        {dayOfWeekAsString(day.getDate())} {capitaliseFirstLetter(this.state.data.meal_type)}
                      </h3>

                      <form className="navbar-right quickViewHeader">

                        <AllergyFilter allergyType="vegetarian" allergyName="Vegetarian" allergyValue={this.state.filters.vegetarian}/>  
                        <AllergyFilter allergyType="glutenfree" allergyName="Gluten-free" allergyValue={this.state.filters.glutenfree}/>  
                
                       </form>       
                </nav>

                <div className="oneLine">
                    {this.state.data.meals.map(function(meal,index){
                        var isSelected = this.state.selected === index;
                        return (
                            <span key={meal.servery.name} >
                                <span className={isSelected ? "selected" : "unselected"} onMouseEnter={this.selectItem.bind(this,index)}> 
                                    <QuickViewItem meal={meal} user={this.props.user} filters={this.state.filters}/>
                                </span>
                            </span>)
                    },this)}
                </div>
            </div>

            )
    }
});

return QuickView;

}];