'use strict';

angular.module('serveryApp')
.controller('MainCtrl', 
  ['$scope', 'Servery', 'Menu','User', 'serveries', function ($scope, Servery, Menu,User, serveries) {

  /*=============================================*
   * Servery selector
   *=============================================*/
  $scope.serveries = serveries;

  $scope.selectServery = function (servery) {
    // Load servery details
    $scope.servery = servery;

    // Load menu
    $scope.menu = Menu.query({'serveryId': servery.id, 'date': $scope.datePicker.dt.toISOString()},
      function() {
        console.log($scope.menu);   // Log to console once loaded
      });
  };

  $scope.meals = ['breakfast', 'lunch', 'dinner'];

  /*=============================================*
   * Date picker
   *=============================================*/
  // Settings for the date picker
  $scope.datePicker = {
    today: function () {
      $scope.datePicker.dt = new Date();
    },
    open: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    },
    dateOptions: {
      'year-format': "'yy'",
      'starting-day': 0
    },
  };

  $scope.$watch('datePicker.dt', function () {

    if ($scope.servery)
      $scope.menu = Menu.query({'serveryId': $scope.servery.id,'date':$scope.datePicker.dt.toISOString()});
  });

  // Initialize the datePicker to today
  $scope.datePicker.today();

}]);

