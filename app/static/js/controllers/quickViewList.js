'use strict';

angular.module('serveryApp')
.controller('QuickViewListCtrl',['$scope',function($scope){


    var selected = 0;

    $scope.setSelected = function(index)
    {
        selected = index;
    }


    var unselectedType = 'rotate';

    $scope.setUnselectedRotate = function()
    {
        unselectedType = 'rotate';
    }

    $scope.setUnselectedSimple = function()
    {
        unselectedType = 'simple';
    }

    $scope.getType = function(index)
    {
        if (index != selected)
            return unselectedType;
        else
            return 'selected';
    }

}]);