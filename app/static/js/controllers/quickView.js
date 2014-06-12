'use strict';

angular.module('serveryApp')
.controller('QuickViewCtrl', ['$scope','nextmeals', function($scope,nextmeals) {

    var daysOfTheWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    $scope.mealOptions = nextmeals.meals;
    $scope.day = daysOfTheWeek[new Date(nextmeals.day).getUTCDay()];
}]);