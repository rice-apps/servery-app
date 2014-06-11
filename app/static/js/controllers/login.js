'use strict';

angular.module('serveryApp')
.controller('LoginController',
                ['$scope','User',"$location",function($scope,User,$location) {

    $scope.user = User.current_user();

    $scope.logout = function()
    {
        User.logout(function()
        {
            $scope.user = null;
        });
    };

}]);
