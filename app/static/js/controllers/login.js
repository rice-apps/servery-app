'use strict';

angular.module('serveryApp')
.controller('LoginController',
                ['$scope','User',"$location",function($scope,User,$location) {

    $scope.logout = function()
    {
        User.logout(function()
        {
            $scope.setUser(null);
        });
    };

}]);
