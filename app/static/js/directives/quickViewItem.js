'use strict';

var i = 0;
angular.module('serveryApp').directive('quickViewItem',function()
{
    return {
      restrict: 'E',
      scope: {
        mealOption: '=',
        mouseenter: '&'
      },
      templateUrl: 'static/views/directives/quickViewItem.html',
      link: function(scope, elem, attrs) {

        elem.mouseenter(function()
        {
            scope.$apply(scope.mouseenter);
        });

       }
   };
});