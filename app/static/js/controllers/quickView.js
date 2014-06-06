'use strict';

angular.module('serveryApp')
.controller('QuickViewCtrl', ['$scope','Servery','Vote', function($scope,Servery,Vote) {


    Servery.nextMeals(function(result)
    {
        $scope.mealOptions = result;
        console.log(result);

    });

    $scope.upvote = function(item)
    {
        console.log(item.id)
        item.score += 1
        Vote.upvote({dishdetailsId:item.id},function(result)
        {
            item.score = result.new_score
        });
    };

    
}]);