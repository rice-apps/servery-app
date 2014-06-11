'use strict';

angular.module('serveryApp')
.controller('QuickViewCtrl', ['$scope','Servery','Vote', function($scope,Servery,Vote) {

    var daysOfTheWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];


    Servery.nextMeals(function(result)
    {
        $scope.mealOptions = result.meals;
        $scope.day = daysOfTheWeek[new Date(result.day).getUTCDay()];
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

        if (item.vote_type == "up")
            item.score -= 1;
        else if (item.vote_type == "down")
            item.score += 1;

        item.vote_type = "none";
        Vote.reset({dishdetailsId:item.id},function(result)
        {
            item.score = result.new_score;
        });

    }



    
}]);