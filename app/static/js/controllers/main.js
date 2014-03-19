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
    //$scope.selectedPeriod = openhours;
    console.log("Selected servery: " + servery.name);
    console.log(servery);
  };

  $scope.changeDate = function (date_num) {
    if (date_num === 0){
      return("Sunday");
    }
    else if (date_num===1){
      return("Monday");
    }
    else if (date_num === 2){
      return("Tuesday");
    }
    else if (date_num === 3){
      return("Wednesday");
    }
    else if (date_num === 4){
      return("Thursday");
    }
    else if (date_num === 5){
      return("Friday");
    }
    else if (date_num === 6){
      return("Saturday");
    }
  }

  // $scope.changeDate = function(date) {
  //   return $filter('date')(date, date:'hh:mm')
  // }

});

