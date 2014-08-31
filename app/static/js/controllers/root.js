angular.module('serveryApp')
.controller('RootController',
                ['$scope','User',function($scope,User) {

    $scope.user = User.current_user();
    $scope.setUser = function(user){
    	$scope.user = user;
    }

}]);