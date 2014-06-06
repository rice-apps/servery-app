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
        if (item.vote_type == "up")
        {
            $scope.reset(item);
            return;
        }
        else if (item.vote_type == "down")
            item.score += 1;

        item.score += 1;
        item.vote_type = "up";

        Vote.upvote({dishdetailsId:item.id},function(result)
        {
            item.score = result.new_score;
        });
    };

    $scope.downvote = function(item)
    {
        if (item.vote_type == "down")
        {
            $scope.reset(item);
            return;
        }

        else if (item.vote_type == "up")
            item.score -= 1;

        item.score -= 1;
        item.vote_type = "down";
        Vote.downvote({dishdetailsId:item.id},function(result)
        {
            item.score = result.new_score;
        });
    }

    $scope.reset = function(item)
    {
        console.log("reset");

        if (item.vote_type == "up")
            item.score -= 1;
        else if (item.vote_type == "down")
            item.score += 1;

        item.vote_type = "none";
    }



    
}]);