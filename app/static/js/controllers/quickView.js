'use strict';

angular.module('serveryApp')
.controller('QuickViewCtrl', ['$scope','Servery', function($scope,Servery) {


    Servery.all(function(result)
    {
        $scope.serveries = result.map(function(servery)
        {
            console.log(servery);
            return servery.fullname;
        });


    });

    $scope.meal  = "food";

    


}]);