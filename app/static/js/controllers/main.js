'use strict'

angular.module('serveryApp')
.controller('MainCtrl', 
  ['$scope', 'Servery', 'Menu', function ($scope, Servery, Menu) {

  /*=============================================*
   * Servery selector
   *=============================================*/
  $scope.serveries = Servery.all(function () {
    // Once serveries are loaded
    if ($scope.serveries.length > 0)
      $scope.selectServery($scope.serveries[0]);
    else
      console.log('No serveries found');
  });

  $scope.selectServery = function (servery) {
    // Load servery details
    $scope.servery = Servery.query({'serveryId': servery.id},
      function() {
        console.log($scope.servery); // Log to console once loaded
      });

    // Load menu
    $scope.menu = Menu.query({'serveryId': servery.id},
      function() {
        console.log($scope.menu);   // Log to console once loaded
      });

    console.log("Selected servery: " + servery.name);
    console.log(servery);
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
    console.log('Date has changed to ' + $scope.datePicker.dt);
  });

  // Initialize the datePicker to today
  $scope.datePicker.today();

}]);

