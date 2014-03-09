'use strict'

angular.module('serveryApp')
.controller('MainCtrl', function ($scope, $location, ApiStub) {

  $scope.$watch('datePicker.dt', function () {
    console.log('Date has changed to ' + $scope.datePicker.dt);
  });

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

  // Initialize the datePicker to today
  $scope.datePicker.today();

  // Load serveries from the API
  ApiStub.serveries().then(function (data) {
    $scope.serveries = data;
    $scope.selectedServery = $scope.serveries[0];
  }, function (error) {
    alert(error);
  });

  $scope.selectServery = function (servery) {
    $scope.selectedServery = servery;
    console.log("Selected servery: " + servery.name);
  };

});

