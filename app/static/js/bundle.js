(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";var angular="undefined"!=typeof window?window.angular:"undefined"!=typeof global?global.angular:null,serveryApi=require("./services/api"),serveryComponents=require("./components/serverycomponents"),module=angular.module("serveryApp",["serveryApi","serveryComponents"]);module.controller("RootController",require("./controllers/root"));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/serverycomponents":12,"./controllers/root":13,"./services/api":16}],2:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null;module.exports=["FilterStore",function(e){var a=React.createClass({displayName:"AllergyFilter",onFilterChange:function(a,l){e.setFilter(a,l.target.checked)},render:function(){return React.DOM.div({className:"inline checkbox"},React.DOM.label({className:"allergyFilterLabel"},React.DOM.h5({className:"inline noMargin"},this.props.allergyName," Only  ",React.DOM.img({src:"/static/img/"+this.props.allergyType+".png",className:"allergyIcon inline noMargin"})," "),React.DOM.input({type:"checkbox",className:"foodFilterCheckbox",onChange:this.onFilterChange.bind(this,this.props.allergyType),checked:this.props.allergyValue})))}});return a}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
var Router="undefined"!=typeof window?window.ReactRouter:"undefined"!=typeof global?global.ReactRouter:null,React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null;module.exports=["MealMenu","MenuStore","AllergyFilter","FilterStore",function(e,a,t,n){var r=["breakfast","lunch","dinner"],s=React.createClass({displayName:"Detail",getInitialState:function(){return{menu:{},filters:n.getFilters()}},getServery:function(){return this.props.serveries.filter(function(e){return e.name===this.props.params.serveryName},this)[0]},getDate:function(){return this.props.query.date?new Date(this.props.query.date):new Date},selectServery:function(e){a.setServery(e)},openMenu:function(e){e.preventDefault(),e.stopPropagation()},componentDidMount:function(){var e=this.refs.datepicker.getDOMNode();$(e).datepicker("setDate",this.getDate()),$(e).on("changeDate",function(e){a.setDate(e.date)}.bind(this)),a.addListener(this.onUpdate),n.addListener(this.onUpdate),a.initialize(this.getServery(),this.getDate())},componentWillUnmount:function(){a.removeListener(this.onUpdate),n.removeListener(this.onUpdate)},onUpdate:function(){this.setState({menu:a.getMenu(),filters:n.getFilters()})},render:function(){var a=this.getServery();return React.DOM.div(null,React.DOM.nav({className:"navbar navbar-default",role:"navigation"},React.DOM.div({className:"container"},React.DOM.div({className:"navbar-header"},React.DOM.a({className:"navbar-brand visible-xs-block"},a?a.fullname:"Select Servery"),React.DOM.button({type:"button",className:"navbar-toggle","data-toggle":"collapse","data-target":"#bs-example-navbar-collapse-1"},React.DOM.span({className:"sr-only"},"Toggle navigation"),React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"}))),React.DOM.div({className:"collapse navbar-collapse",id:"bs-example-navbar-collapse-1"},React.DOM.ul({className:"nav navbar-nav"},React.DOM.li({className:"dropdown"},React.DOM.a({href:"#",className:"dropdown-toggle","data-toggle":"dropdown"},a?a.fullname:"Select Servery"," ",React.DOM.b({className:"caret"})),React.DOM.ul({className:"dropdown-menu"},this.props.serveries.map(function(e){return React.DOM.li({key:e.fullname},React.DOM.a({onClick:this.selectServery.bind(this,e)},e.fullname))},this)))),React.DOM.form({className:"navbar-form navbar-left"},React.DOM.div(null,React.DOM.input({type:"text",style:{width:"205px"},className:"form-control","data-provide":"datepicker","data-date-autoclose":"true",ref:"datepicker"}),React.DOM.button({className:"btn btn-default",onClick:this.openMenu},React.DOM.i({className:"glyphicon glyphicon-calendar"})))),React.DOM.form({className:"navbar-form navbar-right",role:"search"},t({allergyType:"vegetarian",allergyName:"Vegetarian",allergyValue:this.state.filters.vegetarian}),t({allergyType:"glutenfree",allergyName:"Gluten-free",allergyValue:this.state.filters.glutenfree}))))),a&&React.DOM.div({className:"row"},React.DOM.div({className:"servery-info col-sm-6 col-sm-4"},React.DOM.div({className:"thumbnail"},React.DOM.img({src:"/static/img/serveries/"+a.name+".jpg",alt:"..."}),React.DOM.div({className:"caption"},React.DOM.h4(null,a.fullname," "))),ServeryHours({servery:a})),React.DOM.div({className:"servery col-sm-6 col-md-8"},React.DOM.h2(null," Menu "),r.slice(1).map(function(a){return e({key:a,meal:a,menuitems:this.state.menu[a],user:this.props.user,filters:this.state.filters})},this))))}});return s}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null;module.exports=React.createClass({displayName:"exports",render:function(){return React.DOM.footer(null,React.DOM.div({className:"row"},React.DOM.div({className:"col-lg-12"},React.DOM.p(null,"Made by ",React.DOM.a({href:"http://csclub.rice.edu/riceapps"},"Rice Apps"),". View code ",React.DOM.a({href:"http://github.com/rice-apps"},"here"),"."))))}});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null,ReactRouter="undefined"!=typeof window?window.ReactRouter:"undefined"!=typeof global?global.ReactRouter:null;module.exports=["LoginStatus",function(a){var e=ReactRouter.ActiveState,t=ReactRouter.Link,n=React.createClass({displayName:"Tab",mixins:[e],getInitialState:function(){return{isActive:!1}},updateActiveState:function(){this.setState({isActive:n.isActive(this.props.to,this.props.params,this.props.query)})},render:function(){var a=this.state.isActive?"active":"",e=t(this.props);return React.DOM.li({className:a},e)}}),i=React.createClass({displayName:"Header",closeMenu:function(){var a=$("#navbar-main-toggle.navbar-toggle");a.is(":visible")&&a.trigger("click")},render:function(){return React.DOM.div({className:"navbar navbar-default navbar-fixed-top"},React.DOM.div({className:"container"},React.DOM.div({className:"navbar-header"},React.DOM.a({href:"/",className:"navbar-brand"},"Servery App"),React.DOM.button({id:"navbar-main-toggle",className:"navbar-toggle",type:"button","data-toggle":"collapse","data-target":"#navbar-main"},React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"}))),React.DOM.div({className:"navbar-collapse collapse",id:"navbar-main"},React.DOM.ul({className:"nav navbar-nav"},n({to:"quickview",onClick:this.closeMenu}," Next Meal "),n({to:"detail",onClick:this.closeMenu}," Servery Information ")),a({user:this.props.user}))))}});return i}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null;module.exports=["LoginEvent","User",function(e,t){var a=React.createClass({displayName:"LoginStatus",closeMenu:function(){var e=$("#navbar-main-toggle.navbar-toggle");e.is(":visible")&&e.trigger("click")},render:function(){var e;return e=null!==this.props.user&&"username"in this.props.user?[React.DOM.li({key:"userid"},React.DOM.a({onClick:this.closeMenu},this.props.user.username)," "),React.DOM.li({key:"logout"},React.DOM.a({href:"#",onClick:this.logout}," Logout "))]:[React.DOM.li({key:"login"},React.DOM.a({href:"/api/auth/login"},"Login"))],React.DOM.ul({className:"nav navbar-nav navbar-right"},React.DOM.li(null,React.DOM.a({href:"http://csclub.rice.edu/riceapps",onClick:this.closeMenu,target:"_blank"},"Built by Rice Apps")),e)},logout:function(a){a.preventDefault(),t.logout(function(){e.setUser(null)}),this.closeMenu()}});return a}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null,Footer=require("./footer");module.exports=["Header","Detail","User","LoginEvent","MenuStore",function(e,t,n,r,s){var i=React.createClass({displayName:"Main",render:function(){return React.DOM.div(null,e({user:this.state.user}),React.DOM.div({className:"container"},React.DOM.div({id:"page-content"},this.props.activeRouteHandler({serveries:this.props.serveries,user:this.state.user})),Footer(null)))},getInitialState:function(){return{user:null,servery:{},menu:{}}},setUser:function(e){this.setState({user:e})},setServeryAndMenu:function(e,t){this.setState({servery:e,menu:t})},componentDidMount:function(){n.current_user(function(e){this.setUser(e)}.bind(this)),r.addListener(function(e){s.updateMenu(),this.setUser(e)}.bind(this))}});return i}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./footer":4}],8:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null;module.exports=["MenuItem","FilterStore",function(e,t){var a=React.createClass({displayName:"MealMenu",render:function(){var a=t.getFilterFunction(this.props.filters);return React.DOM.div({className:"menu panel panel-primary"},React.DOM.div({className:"panel-heading"},React.DOM.h3({className:"panel-title"},this.props.meal)),React.DOM.div({className:"panel-body"},this.props.menuitems&&0!==this.props.menuitems.length?React.DOM.ul({className:"list-group"},this.props.menuitems.map(function(t){var s="list-group-item menuItem";return a(t)||(s+=" hidden"),React.DOM.li({key:t.name,className:s},e({item:t,user:this.props.user}))},this)):React.DOM.em({className:"not-found"},"No items found.")))}});return a}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null;module.exports=["MenuStore","NextMealsStore","Restangular",function(e,t,n){var s=React.createClass({displayName:"MenuItem",getQuery:function(e){return n.one("dishes",this.props.item.id).one("vote",e).customPOST()},upvote:function(){"up"==this.props.item.vote_type?this.reset():this.getQuery("up").then(function(){e.updateMenu(),t.updateMenu()})},downvote:function(){"down"==this.props.item.vote_type?this.reset():this.getQuery("down").then(function(){e.updateMenu(),t.updateMenu()})},reset:function(){this.getQuery("none").then(function(){e.updateMenu(),t.updateMenu()})},render:function(){function e(e,t){return-1!==e.indexOf(t)}function t(e){return n(e)}function n(e){return e.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})}var s=React.addons.classSet,a=s({btn:!0,"btn-default":!0,"btn-xs":!0,"btn-default":"up"!==this.props.item.vote_type,"btn-success":"up"===this.props.item.vote_type,invisible:null===this.props.user||!("username"in this.props.user)}),i=s({btn:!0,"btn-default":!0,"btn-xs":!0,"btn-default":"down"!==this.props.item.vote_type,"btn-success":"down"===this.props.item.vote_type,invisible:null===this.props.user||!("username"in this.props.user)}),o=[];return(e(this.props.item.allergyflags,"vegetarian")||e(this.props.item.allergyflags,"vegan"))&&o.push(React.DOM.img({key:"vegetarian",src:"/static/img/vegetarian.png",className:"allergyIcon"})),e(this.props.item.allergyflags,"gluten")||o.push(React.DOM.img({key:"gluten",src:"/static/img/glutenfree.png",className:"allergyIcon"})),React.DOM.div(null,React.DOM.span(null,t(this.props.item.name),o),React.DOM.span({className:"pull-right"},React.DOM.a({className:a,onClick:this.upvote},React.DOM.i({className:"glyphicon glyphicon-chevron-up"})),React.DOM.span({className:"score"},this.props.item.score),React.DOM.a({className:i,onClick:this.downvote},React.DOM.i({className:"glyphicon glyphicon-chevron-down"}))))}});return s}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null,Router="undefined"!=typeof window?window.ReactRouter:"undefined"!=typeof global?global.ReactRouter:null;module.exports=["MealMenu","NextMealsStore","AllergyFilter","MenuItem","Restangular","FilterStore",function(e,t,a,n,s,i){function r(e){return["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][e]}function l(e){return e.charAt(0).toUpperCase()+e.slice(1)}var d=React.createClass({displayName:"QuickViewItem",render:function(){var e=i.getFilterFunction(this.props.filters);return React.DOM.span({className:"menuThing"},React.DOM.div({className:"menu panel panel-primary noMarginIfRotate"},React.DOM.div({className:"panel-heading"},React.DOM.h3({className:"panel-title"},this.props.meal.servery.fullname)),React.DOM.div({className:"panel-body menuItemList"},React.DOM.ul({className:"list-group"},this.props.meal.dishes.map(function(t){var a="list-group-item row";return e(t)||(a+=" hidden"),React.DOM.li({key:t.name,className:a},React.DOM.div({className:"detailedMenuItem"},n({item:t,user:this.props.user})))},this)))))}}),c=React.createClass({displayName:"QuickView",getInitialState:function(){return{data:{loading:!0},selected:0,filters:i.getFilters()}},componentDidMount:function(){t.addListener(this.onUpdate),i.addListener(this.onUpdate),t.initialize()},onUpdate:function(){this.setState({data:t.getNextMeals(),filters:i.getFilters()})},componentWillUnmount:function(){t.removeListener(this.onUpdate),i.removeListener(this.onUpdate)},selectItem:function(e){this.setState({selected:e})},render:function(){if(this.state.data.loading)return React.DOM.span(null," Loading ");var e=new Date(this.state.data.day);return React.DOM.div({id:"topHeader"},React.DOM.nav({className:"navbar navbar-default"},React.DOM.h3({className:"nav navbar-text quickViewHeader"},r(e.getDate())," ",l(this.state.data.meal_type)),React.DOM.form({className:"navbar-right quickViewHeader"},a({allergyType:"vegetarian",allergyName:"Vegetarian",allergyValue:this.state.filters.vegetarian}),a({allergyType:"glutenfree",allergyName:"Gluten-free",allergyValue:this.state.filters.glutenfree}))),React.DOM.div({className:"oneLine"},this.state.data.meals.map(function(e,t){var a=this.state.selected===t;return React.DOM.span({key:e.servery.name},React.DOM.span({className:a?"selected":"unselected",onMouseEnter:this.selectItem.bind(this,t)},d({meal:e,user:this.props.user,filters:this.state.filters})))},this)))}});return c}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null,ReactRouter="undefined"!=typeof window?window.ReactRouter:"undefined"!=typeof global?global.ReactRouter:null;module.exports=["Main","Detail","QuickView",function(e,t,a){function r(r){return n({location:"history"},o({name:"app",path:"/",handler:e,serveries:r},o({name:"detail",handler:u},o({path:"",handler:t}),o({path:":serveryName",name:"detailWithServery",handler:t})),o({name:"quickview",handler:a}),i({to:"quickview"})))}var n=ReactRouter.Routes,o=ReactRouter.Route,i=(ReactRouter.DefaultRoute,ReactRouter.Redirect),u=React.createClass({displayName:"Pass",render:function(){return this.props.activeRouteHandler({serveries:this.props.serveries,user:this.props.user})}});return r}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
var angular="undefined"!=typeof window?window.angular:"undefined"!=typeof global?global.angular:null;require("../stores/dispatch"),require("../services/api");var serveryComponents=angular.module("serveryComponents",["dispatch","userApi"]).factory("CreateRouter",require("./router")).factory("Main",require("./main")).factory("Header",require("./header")).factory("LoginStatus",require("./loginstatus")).factory("Detail",require("./detail")).factory("MealMenu",require("./menu")).factory("MenuItem",require("./menuitem")).factory("AllergyFilter",require("./allergyfilter")).factory("QuickView",require("./quickview"));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../services/api":16,"../stores/dispatch":17,"./allergyfilter":2,"./detail":3,"./header":5,"./loginstatus":6,"./main":7,"./menu":8,"./menuitem":9,"./quickview":10,"./router":11}],13:[function(require,module,exports){
(function (global){
var React="undefined"!=typeof window?window.React:"undefined"!=typeof global?global.React:null;module.exports=["Servery","CreateRouter",function(e,n){e.all(function(e){React.renderComponent(n(e.result),document.body)})}];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
!function(r,e,t){"use strict";function n(r){return null!=r&&""!==r&&"hasOwnProperty"!==r&&s.test("."+r)}function a(r,e){if(!n(e))throw i("badmember",'Dotted member path "@{0}" is invalid.',e);for(var a=e.split("."),o=0,s=a.length;s>o&&r!==t;o++){var c=a[o];r=null!==r?r[c]:t}return r}function o(r,t){t=t||{},e.forEach(t,function(r,e){delete t[e]});for(var n in r)!r.hasOwnProperty(n)||"$"===n.charAt(0)&&"$"===n.charAt(1)||(t[n]=r[n]);return t}var i=e.$$minErr("$resource"),s=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;e.module("ngResource",["ng"]).provider("$resource",function(){var r=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}},this.$get=["$http","$q",function(n,s){function c(r){return u(r,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function u(r,e){return encodeURIComponent(r).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,e?"%20":"+")}function p(e,t){this.template=e,this.defaults=d({},r.defaults,t),this.urlParams={}}function l(c,u,$,v){function w(r,e){var t={};return e=d({},u,e),h(e,function(e,n){g(e)&&(e=e()),t[n]=e&&e.charAt&&"@"==e.charAt(0)?a(r,e.substr(1)):e}),t}function y(r){return r.resource}function E(r){o(r||{},this)}var A=new p(c,v);return $=d({},r.defaults.actions,$),E.prototype.toJSON=function(){var r=d({},this);return delete r.$promise,delete r.$resolved,r},h($,function(r,a){var c=/^(POST|PUT|PATCH)$/i.test(r.method);E[a]=function(a,u,p,l){var $,v,b,P={};switch(arguments.length){case 4:b=l,v=p;case 3:case 2:if(!g(u)){P=a,$=u,v=p;break}if(g(a)){v=a,b=u;break}v=u,b=p;case 1:g(a)?v=a:c?$=a:P=a;break;case 0:break;default:throw i("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var T=this instanceof E,O=T?$:r.isArray?[]:new E($),x={},R=r.interceptor&&r.interceptor.response||y,D=r.interceptor&&r.interceptor.responseError||t;h(r,function(r,e){"params"!=e&&"isArray"!=e&&"interceptor"!=e&&(x[e]=m(r))}),c&&(x.data=$),A.setUrlParams(x,d({},w($,r.params||{}),P),r.url);var S=n(x).then(function(t){var n=t.data,a=O.$promise;if(n){if(e.isArray(n)!==!!r.isArray)throw i("badcfg","Error in resource configuration. Expected response to contain an {0} but got an {1}",r.isArray?"array":"object",e.isArray(n)?"array":"object");r.isArray?(O.length=0,h(n,function(r){O.push("object"==typeof r?new E(r):r)})):(o(n,O),O.$promise=a)}return O.$resolved=!0,t.resource=O,t},function(r){return O.$resolved=!0,(b||f)(r),s.reject(r)});return S=S.then(function(r){var e=R(r);return(v||f)(e,r.headers),e},D),T?S:(O.$promise=S,O.$resolved=!1,O)},E.prototype["$"+a]=function(r,e,t){g(r)&&(t=e,e=r,r={});var n=E[a].call(this,r,this,e,t);return n.$promise||n}}),E.bind=function(r){return l(c,d({},u,r),$)},E}var f=e.noop,h=e.forEach,d=e.extend,m=e.copy,g=e.isFunction;return p.prototype={setUrlParams:function(r,t,n){var a,o,s=this,u=n||s.template,p=s.urlParams={};h(u.split(/\W/),function(r){if("hasOwnProperty"===r)throw i("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(r)&&r&&new RegExp("(^|[^\\\\]):"+r+"(\\W|$)").test(u)&&(p[r]=!0)}),u=u.replace(/\\:/g,":"),t=t||{},h(s.urlParams,function(r,n){a=t.hasOwnProperty(n)?t[n]:s.defaults[n],e.isDefined(a)&&null!==a?(o=c(a),u=u.replace(new RegExp(":"+n+"(\\W|$)","g"),function(r,e){return o+e})):u=u.replace(new RegExp("(/?):"+n+"(\\W|$)","g"),function(r,e,t){return"/"==t.charAt(0)?t:e+t})}),s.defaults.stripTrailingSlashes&&(u=u.replace(/\/+$/,"")||"/"),u=u.replace(/\/\.(?=\w+($|\?))/,"."),r.url=u.replace(/\/\\\./,"/."),h(t,function(e,t){s.urlParams[t]||(r.params=r.params||{},r.params[t]=e)})}},l}]})}(window,window.angular);
},{}],15:[function(require,module,exports){
(function (global){
var angular="undefined"!=typeof window?window.angular:"undefined"!=typeof global?global.angular:null,serveryApp=require("./app");angular.element(document).ready(function(){angular.bootstrap(document,["serveryApp"])});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./app":1}],16:[function(require,module,exports){
(function (global){
"use strict";var angular="undefined"!=typeof window?window.angular:"undefined"!=typeof global?global.angular:null,ngResource=require("../lib/angular/angular-resource"),serveryApi=angular.module("serveryApi",["ngResource"]);serveryApi.factory("Servery",["$resource",function(e){return e("/api/serveries/:serveryId",{},{all:{method:"GET",params:{}}})}]);var userApi=angular.module("userApi",["ngResource"]);userApi.factory("User",["$resource",function(e){return e("/api/user",{},{current_user:{method:"GET"},save:{method:"POST"},logout:{method:"POST",url:"/auth/logout"}})}]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/angular/angular-resource":14}],17:[function(require,module,exports){
(function (global){
"use strict";var angular="undefined"!=typeof window?window.angular:"undefined"!=typeof global?global.angular:null,dispatch=angular.module("dispatch",["restangular"]).config(["RestangularProvider",function(e){e.setBaseUrl("/api")}]).factory("FilterStore",require("./filterstore")).factory("MenuStore",require("./menustore")).factory("NextMealsStore",require("./nextmealsstore")),EventEmitter=require("events").EventEmitter;dispatch.factory("LoginEvent",[function(){var e=new EventEmitter;return{addListener:function(t){e.addListener("login",t)},setUser:function(t){e.emit("login",[t])}}}]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./filterstore":18,"./menustore":19,"./nextmealsstore":20,"events":21}],18:[function(require,module,exports){
var EventEmitter=require("events").EventEmitter;module.exports=[function(){var e=new EventEmitter,t={};return{addListener:function(t){e.addListener("filterupdate",t)},removeListener:function(t){e.removeListener("filterupdate",t)},getFilterFunction:function(e){return function(t){function n(e){return-1!==r.indexOf(e)}var r=t.allergyflags;return!e.vegetarian||n("vegetarian")||n("vegan")?e.glutenfree&&n("gluten")?!1:!0:!1}},getFilters:function(){return t},setFilter:function(n,r){t[n]=r,e.emit("filterupdate")}}}];
},{"events":21}],19:[function(require,module,exports){
var EventEmitter=require("events").EventEmitter;module.exports=["Restangular",function(e){"use strict";function t(t,n){return e.one("serveries",t).customGET("menu",{date:n})}var n=new EventEmitter,i={name:"north"},r=new Date,u={loading:!0};return{addListener:function(e){n.addListener("menuupdate",e)},removeListener:function(e){n.removeListener("menuupdate",e)},setServery:function(e){i=e,this.updateMenu(),this.setUrl()},setDate:function(e){r=e,this.updateMenu(),this.setUrl()},initialize:function(e,t){r=t,i=e,this.updateMenu()},setUrl:function(){window.ReactRouter.transitionTo("detailWithServery",{serveryName:i.name},{date:r.toISOString()})},updateMenu:function(){if("undefined"!=typeof i){var e=i.name,a=r.toISOString();t(e,a).then(function(t){e===i.name&&a===r.toISOString()&&(u=t,n.emit("menuupdate"))})}},getMenu:function(){return u}}}];
},{"events":21}],20:[function(require,module,exports){
var EventEmitter=require("events").EventEmitter;module.exports=["Restangular",function(e){"use strict";function t(){return e.all("serveries").customGET("next_meals")}var n=new EventEmitter,i={loading:!0};return{addListener:function(e){n.addListener("nextmealsupdate",e)},removeListener:function(e){n.removeListener("nextmealsupdate",e)},initialize:function(){i={loading:!0},n.emit("nextmealsupdate"),t().then(function(e){i=e,n.emit("nextmealsupdate")})},updateMenu:function(){t().then(function(e){i=e,n.emit("nextmealsupdate")})},getNextMeals:function(){return i}}}];
},{"events":21}],21:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[15]);
