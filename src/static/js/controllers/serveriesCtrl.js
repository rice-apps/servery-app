'use strict'

angular.module('todoApp').controller('ServeriesCtrl', function ($scope, $location) {
  $scope.serveries = [
    {title: "North Servery",
     info: "Serving Brown and Jones Colleges and Martel Dormitory"},
    {title: "East (Seibel) Servery",
     info: "Serving Will Rice and Lovett Colleges"},
    {title: "South Servery",
     info: "Serving Hanszen and Wiess Colleges"},
    {title: "West Servery",
     info: "Serving Duncan and McMurtry Colleges"},
    {title: "Sid Servery",
     info: "Serving Sid Richardson College"},
    {title: "Baker Servery",
     info: "Serving Baker College"},
  ];

  $scope.$on('$routeChangeSuccess', function () {
    angular.forEach($scope.navList, function(item) {
      console.log($location.path())
      item.active = ($location.path() == item.url)
    })
  })
});