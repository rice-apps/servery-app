'use strict';

angular.module('serveryApp')
.controller('QuickViewCtrl', ['$scope','nextmeals', function($scope,nextmeals) {


var selected = 0;

function foo()
{
    console.log("foo");

    var allOptions = $(".menuThing");

    $(allOptions[selected]).addClass("selected");


    for (var i = 0; i < allOptions.length; i++)
    {
        console.log(allOptions[i]);
        var currentPanel = $(allOptions[i]);
        var blah = function(arg){
            $(allOptions[arg]).mouseenter(function()
            {
                console.log("Mouse enter " + arg);
                setSelection(arg);
            });
        }(i);

    }

}

function setSelection(index)
{
    var allOptions = $(".menuThing");

    $(allOptions[selected]).removeClass("selected");
    selected = index;
    $(allOptions[selected]).addClass("selected");
}


    var daysOfTheWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

  

    function recalculateRotateOrSimple()
    {
        var numberOfMenus = nextmeals.meals.length;

        console.log(numberOfMenus);

        var neededSizeForSimple = numberOfMenus * 200 + 200;

        var spaceAvailable = $(".oneLine").width()
        console.log(spaceAvailable);
        console.log(neededSizeForSimple);

        if (neededSizeForSimple > spaceAvailable)
        {
            $("#topHeader").removeClass("simple");
            $("#topHeader").addClass("rotate");
        }
        else
        {
            $("#topHeader").removeClass("rotate");
            $("#topHeader").addClass("simple"); 
        }
    }

    recalculateRotateOrSimple();

    $(window).resize(recalculateRotateOrSimple);
    foo();
  

    $scope.mealOptions = nextmeals.meals;
    $scope.day = daysOfTheWeek[new Date(nextmeals.day).getUTCDay()];
}]);