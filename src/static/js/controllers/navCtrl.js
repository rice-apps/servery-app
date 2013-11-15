'use strict'

angular.module('todoApp').controller('NavCtrl', function ($scope, $location) {
  $scope.navList = [
    {title: "Todos", url: "/"},
    {title: "Active", url: "/active"},
    {title: "Completed", url: "/completed"}
  ];

  $scope.$on('$routeChangeSuccess', function () {
    angular.forEach($scope.navList, function(item) {
      console.log($location.path())
      item.active = ($location.path() == item.url)
    })
  })
});