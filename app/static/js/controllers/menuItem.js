'use strict';

angular.module('serveryApp')
.controller('MenuItemCtrl',['$scope','Vote',function($scope,Vote){

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

        Vote.upvote({dishId:item.id},function(result)
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
        Vote.downvote({dishId:item.id},function(result)
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
        Vote.reset({dishId:item.id},function(result)
        {
            item.score = result.new_score;
        });

    }

}]);