'use strict'

angular.module('serveryApp').controller('ServeriesCtrl', function ($scope, $location) {
  $scope.serveries = [
    {title: "North Servery",
     info: "Brown and Jones",
     image: "#",
     plural: true},
    {title: "East (Seibel) Servery",
     info: "Will Rice and Lovett",
     image: "#",
     plural: true},
    {title: "South Servery",
     info: "Hanszen and Wiess",
     image: "#",
     plural: true},
    {title: "West Servery",
     info: "Duncan and McMurtry",
     image: "#",
     plural: true},
    {title: "Sid Servery",
     info: "Sid Richardson",
     image: "img/Sid_Richardson_tiny_logo.gif",
     plural: false},
    {title: "Baker Servery",
     info: "Baker",
     image: "../img/Baker.gif",
     plural: false},
  ];

  $scope.$on('$routeChangeSuccess', function () {
    angular.forEach($scope.navList, function(item) {
      console.log($location.path())
      item.active = ($location.path() == item.url)
    })
  })
});