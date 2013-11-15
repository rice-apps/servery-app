'use strict'

angular.module('todoApp').controller('ServeriesCtrl', function ($scope, $location) {
  $scope.serveries = [
    {title: "North Servery"},
    {title: "East Servery"},
    {title: "South Servery"},
    {title: "West Servery"},
    {title: "Sid Servery"},
    {title: "Baker Servery"}
  ];

  $scope.$on('$routeChangeSuccess', function () {
    angular.forEach($scope.navList, function(item) {
      console.log($location.path())
      item.active = ($location.path() == item.url)
    })
  })
});