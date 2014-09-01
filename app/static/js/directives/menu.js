'use strict';

angular.module('serveryApp').directive('menuItem',function()
{
    return {
      restrict: 'E',
      scope: {
        item: '=',
        user: '='
      },
      controller: 'MenuItemCtrl',
      templateUrl: 'static/views/directives/menuItem.html'
    };
});