var angular = require('angular');

require('../stores/dispatch');
require('../services/api');

var serveryComponents = angular.module('serveryComponents', ['dispatch','userApi'])
.factory('CreateRouter',require('./router'))
.factory('Main',require('./main'))
.factory('Header',require('./header'))
.factory('LoginStatus',require('./loginstatus'))
.factory('Detail',require('./detail'))
.factory('MealMenu',require('./menu'))
.factory('MenuItem',require('./menuitem'))
.factory('AllergyFilter',require('./allergyfilter'))
.factory('QuickView',require('./quickview'))