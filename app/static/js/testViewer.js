"use strict";

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