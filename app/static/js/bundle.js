(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var FilterStore = require('../stores/filterstore')

AllergyFilter = React.createClass({displayName: 'AllergyFilter',
    onFilterChange: function(type,event){
        FilterStore.setFilter(type,event.target.checked);
    },
    render: function(){
        return (
            React.DOM.div({className: "inline checkbox"}, 
                React.DOM.label({className: "allergyFilterLabel"}, 
                    React.DOM.h5({className: "inline noMargin"}, 
                        this.props.allergyName, " Only" + ' ' + 
                        " ", 
                        React.DOM.img({src: "/static/img/allergyicons/" + this.props.allergyType +".svg", className: "allergyIcon inline noMargin"}), 
                        " "
                    ), 
                    React.DOM.input({type: "checkbox", className: "foodFilterCheckbox", onChange: this.onFilterChange.bind(this,this.props.allergyType), checked: this.props.allergyValue})
                )
            ) 
            );
    }
});

module.exports = AllergyFilter;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/filterstore":15}],2:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var Router = (typeof window !== "undefined" ? window.ReactRouter : typeof global !== "undefined" ? global.ReactRouter : null);
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var ServeryHours = require('./serveryhours');
var FilterStore = require('../stores/filterstore');
var MenuStore = require('../stores/menustore');

var AllergyFilter = require('./allergyfilter');
var MealMenu = require('./menu');


var meals = ['breakfast', 'lunch', 'dinner'];


var Detail = React.createClass({displayName: 'Detail',

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
        React.DOM.div(null, 

        /* Main Navbar for the App */

        React.DOM.nav({className: "navbar navbar-default", role: "navigation"}, 
        React.DOM.div({className: "container"}, 


 

            /* Brand and toggle get grouped for better mobile display */
            React.DOM.div({className: "navbar-header"}, 
                React.DOM.a({
                  className: "navbar-brand visible-xs-block"}, 
                   servery ? servery.fullname : "Select Servery"
                ), 

              React.DOM.button({
                type: "button", 
                className: "navbar-toggle", 
                'data-toggle': "collapse", 
                'data-target': "#bs-example-navbar-collapse-1"}, 
                  React.DOM.span({className: "sr-only"}, "Toggle navigation"), 
                  React.DOM.span({className: "icon-bar"}), 
                  React.DOM.span({className: "icon-bar"}), 
                  React.DOM.span({className: "icon-bar"})
              )
            ), 

            /* Selection bar */

            React.DOM.div({className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, 

              React.DOM.ul({className: "nav navbar-nav"}, 
                React.DOM.li({className: "dropdown"}, 
                  /* Select servery button */
                  React.DOM.a({
                    href: "#", 
                    className: "dropdown-toggle", 
                    'data-toggle': "dropdown"}, 
                     servery ? servery.fullname : "Select Servery", " ", React.DOM.b({className: "caret"})
                  ), 



                  /* List of serveries for the dropdown menu */
                  React.DOM.ul({className: "dropdown-menu"}, 
                    this.props.serveries.map(function(servery){
                        return (
                            React.DOM.li({key: servery.fullname}, 
                                React.DOM.a({onClick: this.selectServery.bind(this,servery)}, servery.fullname)
                            ));
                    },this)
                  )
                )
              ), 

              React.DOM.form({className: "navbar-form navbar-left"}, 
                React.DOM.div(null, 
                  /* Datepicker */
                  React.DOM.input({
                    type: "text", 
                    style: {width: "205px"}, 
                    className: "form-control", 
                    'data-provide': "datepicker", 
                    'data-date-autoclose': "true", 
                    ref: "datepicker"}
                    ), 
                  /* Datepicker button */
                  React.DOM.button({
                    className: "btn btn-default", 
                    onClick: this.openMenu}, 
                      React.DOM.i({className: "glyphicon glyphicon-calendar"})
                  )
                  
                )
              ), 

              React.DOM.form({className: "navbar-form navbar-right", role: "search"}, 

                    AllergyFilter({allergyType: "vegetarian", allergyName: "Vegetarian", allergyValue: this.state.filters.vegetarian}), 
                    AllergyFilter({allergyType: "glutenfree", allergyName: "Gluten-free", allergyValue: this.state.filters.glutenfree})
 
               )

            )/* /.navbar-collapse */
        )
        ), 

        /* Meal Information */
         servery && (
        
        React.DOM.div({className: "row"}, 

          /* Left column */
          React.DOM.div({className: "servery-info col-sm-6 col-sm-4"}, 

            /* Servery Thumbnail */
            React.DOM.div({className: "thumbnail"}, 
              React.DOM.img({src: "/static/img/serveries/"+servery.name+".jpg", alt: "..."}), 
                React.DOM.div({className: "caption"}, 
                  React.DOM.h4(null, servery.fullname, " ")
                )
            ), 


            ServeryHours({servery: servery})
          ), 

          /* Right column */
          React.DOM.div({className: "servery col-sm-6 col-md-8"}, 
            React.DOM.h2(null, " Menu "), 
            
            meals.slice(1).map(function(meal){
                return MealMenu({key: meal, meal: meal, menuitems: this.state.menu[meal], user: this.props.user, filters: this.state.filters});
            },this)

          )
        ))
        )

);}

});

module.exports = Detail;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/filterstore":15,"../stores/menustore":16,"./allergyfilter":1,"./menu":7,"./serveryhours":11}],3:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var Footer = React.createClass({displayName: 'Footer',
    render: function() {
        return (
            React.DOM.footer(null, 
                React.DOM.div({className: "row"}, 
                    React.DOM.div({className: "col-lg-12"}, 

                        React.DOM.p(null, 
                            "Made by ", React.DOM.a({href: "http://csclub.rice.edu/riceapps"}, "Rice Apps"), "." + ' ' + 
                            "View code ", React.DOM.a({href: "http://github.com/rice-apps"}, "here"), "."
                        )
                        
                    )
                )
    
            )
        );
    }
});

module.exports = Footer;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var ReactRouter = (typeof window !== "undefined" ? window.ReactRouter : typeof global !== "undefined" ? global.ReactRouter : null);

var LoginStatus = require('./loginstatus');


var ActiveState = ReactRouter.ActiveState;

var Link = ReactRouter.Link;

var Tab = React.createClass({displayName: 'Tab',

  mixins: [ ActiveState ],

  getInitialState: function () {
    return { isActive: false };
  },

  updateActiveState: function () {
    this.setState({
      isActive: Tab.isActive(this.props.to, this.props.params, this.props.query)
    })
  },

  render: function() {
    var className = this.state.isActive ? 'active' : '';
    var link = Link(this.props);
    return React.DOM.li({className: className}, link);
  }

});

var Header = React.createClass({displayName: 'Header',

    closeMenu: function(){
        var navbar_toggle = $('#navbar-main-toggle.navbar-toggle');
        if (navbar_toggle.is(':visible')) {
            navbar_toggle.trigger('click');
        }
    },
    render: function() {
        return (

            React.DOM.div({className: "navbar navbar-default navbar-fixed-top"}, 
                React.DOM.div({className: "container"}, 


                    React.DOM.div({className: "navbar-header"}, 
                        React.DOM.a({href: "/", className: "navbar-brand"}, "Servery App"), 

                        React.DOM.button({id: "navbar-main-toggle", className: "navbar-toggle", type: "button", 'data-toggle': "collapse", 'data-target': "#navbar-main"}, 
                            React.DOM.span({className: "icon-bar"}), 
                            React.DOM.span({className: "icon-bar"}), 
                            React.DOM.span({className: "icon-bar"})
                        )

                    ), 

                    React.DOM.div({className: "navbar-collapse collapse", id: "navbar-main"}, 

                        React.DOM.ul({className: "nav navbar-nav"}, 
                            Tab({to: "quickview", onClick: this.closeMenu}, " Next Meal "), 
                            Tab({to: "detail", onClick: this.closeMenu}, " Servery Information ")
                        ), 
                        
                        LoginStatus({user: this.props.user})
                    )
                )
            )
        )
    }
});

module.exports = Header;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./loginstatus":5}],5:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var UserStore = require('../stores/userstore');

var LoginStatus = React.createClass({displayName: 'LoginStatus',
    closeMenu: function(){
        var navbar_toggle = $('#navbar-main-toggle.navbar-toggle');
        if (navbar_toggle.is(':visible')) {
            navbar_toggle.trigger('click');
        }
    },
    render: function(){

        var links;
        if (this.props.user !== null && this.props.user.username)
        {
            links = [
                React.DOM.li({key: "userid"}, React.DOM.a({onClick: this.closeMenu}, this.props.user.username), " "),
                React.DOM.li({key: "logout"}, React.DOM.a({href: "#", onClick: this.logout}, " Logout "))
            ]

        }
        else
        {
            links = [
                React.DOM.li({key: "login"}, React.DOM.a({href: "/api/auth/login"}, "Login"))
            ]
        }

        return (
            React.DOM.ul({className: "nav navbar-nav navbar-right"}, 
                React.DOM.li(null, React.DOM.a({href: "https://trello.com/b/5cVHeknd/serveryappboard", onClick: this.closeMenu, target: "_blank"}, "Feedback")), 

                links
            )
        );
    },

    logout: function(event){
        event.preventDefault();
        UserStore.logout();
        this.closeMenu();
    }
});

module.exports = LoginStatus;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/userstore":18}],6:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var Footer = require('./footer');
var Header = require('./header');

var UserStore = require('../stores/userstore');
var MenuStore = require('../stores/menustore');


var Main = React.createClass({displayName: 'Main',

    getDisclaimer: function () {
        if (this.state.disclaimerExpanded)
            return "Warning: This is not official Rice University Dining information. In particular, allergy information might be inaccurate.";
        else
            return "Warning: ...";
    },

    render: function() {
        return (
            React.DOM.div(null, 

                Header({user: this.state.user}), 
                React.DOM.div({className: "container"}, 

                    React.DOM.div({id: "page-content"}, 
                        React.DOM.h3({onClick: this.toggleDisclaimer}, React.DOM.span({className: "label label-warning disclaimer"}, this.getDisclaimer())), 
                        this.props.activeRouteHandler({serveries: this.props.serveries, user: this.state.user})
                    ), 
                    
                    Footer(null)
                )

            )
        );
    },

    getInitialState: function() {
        return {
            user: null,
            servery: {},
            menu: {},
            disclaimerExpanded: false
        };
    },

    setUser: function(user) {
        this.setState({user:user});
    },

    toggleDisclaimer: function() {
        this.setState({disclaimerExpanded:!this.state.disclaimerExpanded});
    },

    setServeryAndMenu: function(servery,menu) {
        this.setState({servery:servery,menu:menu});
    },
    componentDidMount: function() {
        UserStore.addListener(function (user){
            this.setUser(user);
        }.bind(this));
    }

});


module.exports = Main;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/menustore":16,"../stores/userstore":18,"./footer":3,"./header":4}],7:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var FilterStore = require('../stores/filterstore');

var MenuItem = require('./menuitem');

var MealMenu = React.createClass({displayName: 'MealMenu',
    render: function(){
        var filter = FilterStore.getFilterFunction(this.props.filters);

        return (
            React.DOM.div({className: "menu panel panel-primary"}, 
                React.DOM.div({className: "panel-heading"}, 
                  React.DOM.h3({className: "panel-title"}, this.props.meal)
                ), 
                
                    (this.props.menuitems && this.props.menuitems.length !== 0) ? 
                    
                    (React.DOM.ul({className: "list-group"}, 
                        this.props.menuitems.map(function(item){
                            var classes = "list-group-item menuItem";

                            if (!filter(item))
                                        classes += " hidden";
                            return (
                                React.DOM.li({key: item.name, className: classes}, 
                                    MenuItem({item: item, user: this.props.user})
                                ));
                            },this)
                    )) : 
                    (React.DOM.div({className: "panel-body"}, 
                        React.DOM.em({className: "not-found"}, 
                            "No items found."
                        )
                    ))
                
            )
            );
    }
});

module.exports = MealMenu;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/filterstore":15,"./menuitem":8}],8:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var MenuStore = require('../stores/menustore');
var NextMealsStore = require('../stores/nextmealsstore');

var MenuItem = React.createClass({displayName: 'MenuItem',
    render: function() {

        function processFoodName(name)
        {
            return toTitleCase(name);
        }

        function toTitleCase(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }


        function createImageLink(item)
        {

            var uri = 'https://www.google.com/search?q=' + encodeURIComponent(item)+'&tbm=isch';
            var link = (React.DOM.a({href: uri, target: "_blank"}, React.DOM.i({className: "glyphicon glyphicon-picture foodImageLink"})));
            
            return link
        }
       
        return (
            React.DOM.div(null, 
            
                React.DOM.span(null, 
                 processFoodName(this.props.item.name), 

                 createImageLink(this.props.item.name) 

                )
            ));
    }
});

module.exports = MenuItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/menustore":16,"../stores/nextmealsstore":17}],9:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var Router = (typeof window !== "undefined" ? window.ReactRouter : typeof global !== "undefined" ? global.ReactRouter : null);
var FilterStore = require('../stores/filterstore');
var NextMealsStore = require('../stores/nextmealsstore');

var AllergyFilter = require('./allergyfilter');
var MenuItem = require('./menuitem');
var MealMenu = require('./menu');

var meals = ['breakfast', 'lunch', 'dinner'];

var QuickViewItem = React.createClass({displayName: 'QuickViewItem',
    getFormattedMealItems: function(){
        var filter = FilterStore.getFilterFunction(this.props.filters);

        return this.props.meal.dishes.map(function(item){
            var classes = "list-group-item";

            if (!filter(item))
                classes += " hidden";

            return (
                React.DOM.li({key: item.name, className: classes}, 
                    React.DOM.div({className: "detailedMenuItem"}, 
                        MenuItem({item: item, user: this.props.user})
                    )
                )
                )
        },this);

    },
    render: function() {
        
        return (
            React.DOM.span({className: "menuThing"}, 
                React.DOM.div({className: "menu panel panel-primary noMarginIfRotate"}, 
                    React.DOM.div({className: "panel-heading"}, 
                        React.DOM.h3({className: "panel-title"}, 
                            this.props.meal.servery.fullname
                        )
                    ), 
      
                        React.DOM.ul({className: "list-group menuItemList"}, 
                            this.props.meal.dishes.length == 0? 
                                React.DOM.li({className: "list-group-item"}, " A meal is being served at this time, but there is no menu information available.") : 
                                this.getFormattedMealItems()
                        )
                    
                )
            ))
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

var QuickView = React.createClass({displayName: 'QuickView',
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
                React.DOM.span({key: meal.servery.name}, 
                    React.DOM.span({className: isSelected ? "selected" : "unselected", onMouseEnter: this.selectItem.bind(this,index)}, 
                        QuickViewItem({meal: meal, user: this.props.user, filters: this.state.filters})
                    )
                ))
        },this);
    },
    renderMealTime: function(){
        if (this.state.data.start_time)
        {
            return (   
                React.DOM.span({className: "mealTime"}, 
                    twelvehour(this.state.data.start_time) +"-" + twelvehour(this.state.data.end_time)
                ))
        }
        else
            return null;

    },
    render: function() { 
        if (this.state.data.loading)
            return React.DOM.span(null, " Loading ")

        var day = new Date(this.state.data.day);
        return (
            React.DOM.div({id: "topHeader"}, 
                React.DOM.nav({className: "navbar navbar-default"}, 
            
                      React.DOM.h3({className: "nav navbar-text quickViewHeader"}, 
                        React.DOM.span(null, 
                            dayOfWeekAsString(day.getDay()) + " " + capitaliseFirstLetter(this.state.data.meal_type)+" "
                        ), 
                        this.renderMealTime()
                      ), 

                      React.DOM.form({className: "navbar-right quickViewHeader"}, 

                        AllergyFilter({allergyType: "vegetarian", allergyName: "Vegetarian", allergyValue: this.state.filters.vegetarian}), 
                        AllergyFilter({allergyType: "glutenfree", allergyName: "Gluten-free", allergyValue: this.state.filters.glutenfree})
                
                       )
                ), 
                React.DOM.div({className: "quickViewChangeMealButtons btn-group"}, 
                    React.DOM.a({role: "button", onClick: this.previousMeal, className: "btn btn-default"}, React.DOM.span({className: "glyphicon glyphicon-chevron-left"}), "Previous"), 
                    React.DOM.a({role: "button", onClick: this.currentMeal, className: "btn btn-default"}, "Current meal"), 
                    React.DOM.a({role: "button", onClick: this.nextMeal, className: "btn btn-default"}, "Next", React.DOM.span({className: "glyphicon glyphicon-chevron-right"}))
                ), 

                React.DOM.div({className: "oneLine"}, 
                    this.state.data.meals.length == 0? (React.DOM.h2(null, " There are no serveries open for this meal. ")) : this.renderServeryMenus()
                )
            )

            )
    }
});

module.exports = QuickView;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/filterstore":15,"../stores/nextmealsstore":17,"./allergyfilter":1,"./menu":7,"./menuitem":8,"./utils":12}],10:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var ReactRouter = (typeof window !== "undefined" ? window.ReactRouter : typeof global !== "undefined" ? global.ReactRouter : null);

var Detail = require('./detail');
var QuickView = require('./quickview');
var Main = require('./main');

var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Redirect = ReactRouter.Redirect;

var Pass = React.createClass({displayName: 'Pass',
    render: function() {
        return this.props.activeRouteHandler({serveries: this.props.serveries, user: this.props.user})
    }
});

function CreateRouter(serveries)
{
    return (
        Routes({location: "history"}, 
            Route({name: "app", path: "/", handler: Main, serveries: serveries}, 
                Route({name: "detail", handler: Pass}, 
                    Route({path: "", handler: Detail}), 
                    Route({path: ":serveryName", name: "detailWithServery", handler: Detail})
                ), 
                Route({name: "quickview", handler: QuickView}), 
                Redirect({to: "quickview"})
            )
        ));
}

module.exports = CreateRouter;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./detail":2,"./main":6,"./quickview":9}],11:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

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

var twelvehour = require('./utils').twelvehour


module.exports = React.createClass({displayName: 'exports',

    render: function() {
        return (
            React.DOM.div({className: "panel panel-default"}, 
              React.DOM.div({className: "panel-heading"}, 
                "Hours", 
                
                    this.props.servery.open_now ? 
                    (React.DOM.span({className: "label label-success"}, 
                        "Currently Open"
                    )) :

                    (React.DOM.span({className: "label label-default"}, 
                        "Currently Closed"
                    ))
                
              ), 
              React.DOM.table({className: "table"}, 
                React.DOM.tbody(null, 
                    React.DOM.tr(null, " ", /* Meal headers */
                      React.DOM.td(null), 
                      meals.map(function(meal){
                        return (
                            React.DOM.th({key: meal}, meal));
                      })
                    ), 
                    this.props.servery.hours && Object.keys(this.props.servery.hours).map(function(period){
                        return (
                            React.DOM.tr({key: period}, 
                              React.DOM.td(null, " ", dayofweek(period), " "), 
                              meals.map(function(meal){
                                return (
                                    React.DOM.td({key: meal}, 
                                    
                                        this.props.servery.hours[period][meal] && 
                                        (React.DOM.span(null, 
                                            twelvehour(this.props.servery.hours[period][meal].start_time), " -  ", twelvehour(this.props.servery.hours[period][meal].end_time)
                                        ))
                                    
                                        
                                    )
                                    );
                              },this)
                            )
                            );
                    },this)
                )
              )
            ));
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":12}],12:[function(require,module,exports){
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

module.exports = {
    "twelvehour": twelvehour
}
},{}],13:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/**
 * EventEmitter v4.0.3 - git.io/ee
 * Oliver Caldwell
 * MIT license
 */(function(e){"use strict";function t(){}function i(e,t){if(r)return t.indexOf(e);var n=t.length;while(n--)if(t[n]===e)return n;return-1}var n=t.prototype,r=Array.prototype.indexOf?!0:!1;n.getListeners=function(e){var t=this._events||(this._events={});return t[e]||(t[e]=[])},n.addListener=function(e,t){var n=this.getListeners(e);return i(t,n)===-1&&n.push(t),this},n.on=n.addListener,n.removeListener=function(e,t){var n=this.getListeners(e),r=i(t,n);return r!==-1&&(n.splice(r,1),n.length===0&&(this._events[e]=null)),this},n.off=n.removeListener,n.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},n.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},n.manipulateListeners=function(e,t,n){var r,i,s=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if(typeof t=="object")for(r in t)t.hasOwnProperty(r)&&(i=t[r])&&(typeof i=="function"?s.call(this,r,i):o.call(this,r,i));else{r=n.length;while(r--)s.call(this,t,n[r])}return this},n.removeEvent=function(e){return e?this._events[e]=null:this._events=null,this},n.emitEvent=function(e,t){var n=this.getListeners(e),r=n.length,i;while(r--)i=t?n[r].apply(null,t):n[r](),i===!0&&this.removeListener(e,n[r]);return this},n.trigger=n.emitEvent,typeof define=="function"&&define.amd?define(function(){return t}):e.EventEmitter=t})(this);
; browserify_shim__define__module__export__(typeof EventEmitter != "undefined" ? EventEmitter : window.EventEmitter);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var CreateRouter = require('./components/router');

$(document).ready(function() {
    $.get('/api/serveries').done(function(serveryData){
        var main = React.renderComponent(
            CreateRouter(serveryData.result),
            document.body
        );
    });
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/router":10}],15:[function(require,module,exports){
var EventEmitter = require('event-emitter');

var FilterStoreEvents = new EventEmitter();
var filters = {};

module.exports = {
    addListener: function (callback){
        FilterStoreEvents.addListener('filterupdate',callback);
    },
    removeListener: function (callback){
        FilterStoreEvents.removeListener('filterupdate',callback);
    },
    getFilterFunction: function(filters){
        return function(item){
            var flags = item.allergyflags;

            function contains(flag)
            {
                return flags.indexOf(flag) !== -1;
            }

            if (filters.vegetarian){
                if (!contains("vegetarian") && !contains("vegan"))
                    return false;
            }
            if (filters.glutenfree){
                if (contains("gluten"))
                    return false;
            }

            return true;
        }
    },
    getFilters: function(){
        return filters;
    },
    setFilter: function(type,value){
        filters[type] = value;
        FilterStoreEvents.emitEvent('filterupdate');
    }
}
},{"event-emitter":13}],16:[function(require,module,exports){
var EventEmitter = require('event-emitter');
var UserStore = require('./userstore');

"use strict";

var MenuStoreEvents = new EventEmitter();

var currentServery = {name:"north"}
var currentDate = new Date();
var currentMenu = {loading:true};

function getMenu(serveryId,isoDate){
    var menuUrl = "/api/serveries/" + serveryId + '/menu?' + $.param({date:isoDate});

    return $.get(menuUrl);
}

var MenuStore = {
    addListener: function(callback){
        MenuStoreEvents.addListener('menuupdate',callback);
    },
    removeListener: function(callback){
        MenuStoreEvents.removeListener('menuupdate',callback);
    },
    setServery: function(servery) {
        currentServery = servery;
        this.updateMenu();
        this.setUrl();
    },
    setDate: function(date){
        currentDate = date;
        this.updateMenu();
        this.setUrl();
    },
    initialize: function(servery,date){
        currentDate = date;
        currentServery = servery;
        this.updateMenu();
    },
    setUrl: function(){
        window.ReactRouter.transitionTo('detailWithServery',{serveryName:currentServery.name},{date:currentDate.toISOString()});
    },
    updateMenu: function(){

        if (typeof currentServery === "undefined")
            return;
        
        var queryId = currentServery.name;
        var queryDate = currentDate.toISOString();

        getMenu(queryId,queryDate).then(function(result){
            // Double check that this query is still valid.
            if (queryId === currentServery.name && queryDate === currentDate.toISOString())
            {
                currentMenu = result;
                MenuStoreEvents.emitEvent('menuupdate');

            }  
        });     
    },
    getMenu: function(){
        return currentMenu;
    }
};

UserStore.addListener(function(){
    MenuStore.updateMenu();
});

module.exports = MenuStore;

},{"./userstore":18,"event-emitter":13}],17:[function(require,module,exports){
var EventEmitter = require('event-emitter');
var UserStore = require('./userstore');

"use strict";

var NextMealsEvents = new EventEmitter();

var nextMeals = {loading:true};

var offset=0;

function getNextMeals(){
    var nextMealsUrl = '/api/serveries/next_meals?' + $.param({offset:offset});

    return $.get(nextMealsUrl);
}

var NextMealsStore = {
    addListener: function(callback){
        NextMealsEvents.addListener('nextmealsupdate',callback);
    },
    removeListener: function(callback){
        NextMealsEvents.removeListener('nextmealsupdate',callback);
    },
    initialize: function(){
        nextMeals = {loading:true};
        NextMealsEvents.emitEvent('nextmealsupdate');

        getNextMeals().then(function(result){
            nextMeals = result;
            NextMealsEvents.emitEvent('nextmealsupdate');
        })
    },
    updateMenu: function(){
        getNextMeals().then(function(result){
            nextMeals = result;
            NextMealsEvents.emitEvent('nextmealsupdate');
        })
    },
    getNextMeals: function(){
        return nextMeals;
    },
    setOffset: function(newOffset){
        offset = newOffset;
        this.updateMenu();
    },
    getOffset: function(){
        return offset;
    }
}

UserStore.addListener(function(){
    NextMealsStore.updateMenu();
});

module.exports = NextMealsStore;
},{"./userstore":18,"event-emitter":13}],18:[function(require,module,exports){
var EventEmitter = require('event-emitter');

var Events = new EventEmitter();

var user = null;


var UserStore = {
    addListener: function(callback){
        Events.addListener('login',callback);
        callback(user);
    },
    setUser: function(newUser) {
        user = newUser;
        Events.emitEvent('login',[user]);
    },
    getUser: function() {
        return user;
    },
    logout: function(){
        $.post("/api/auth/logout").done(function(){
            setUser(null);
        });
    },
    initialize: function(){
        $.get("/api/user/current_user").done(function (userResult){
            setUser(userResult);
        });
    }
}

module.exports = UserStore;
},{"event-emitter":13}]},{},[14]);
