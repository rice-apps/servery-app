'use strict';



angular.module('serveryApp').directive('quickViewList',function()
{
    return {
      restrict: 'E',
      scope: {
        mealOptions: '='
      },
      controller: 'QuickViewListCtrl',
      templateUrl: 'static/views/directives/quickViewList.html',
      link: function(scope, elem, attrs) {

        function recalculateRotateOrSimple()
        {
          var numberOfMenus = scope.mealOptions.length;

          var neededSizeForSimple = numberOfMenus * 200 + 200;

          var spaceAvailable = $(".oneLine").width();

          if (neededSizeForSimple > spaceAvailable)
          {

            scope.setUnselectedRotate();
          }
          else
          {
            scope.setUnselectedSimple();
          }
          
        }

        recalculateRotateOrSimple();

        $(window).resize(function(){scope.$apply(recalculateRotateOrSimple)});

      }
    };
});