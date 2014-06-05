'use strict';

angular.module('serveryApp')
.controller('QuickViewCtrl', ['$scope','Servery', function($scope,Servery) {


    Servery.nextMeals(function(result)
    {
        $scope.mealOptions = result;
        console.log(result);

    });

    
}]);