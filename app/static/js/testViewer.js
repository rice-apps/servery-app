"use strict";

var selected = 0;

function foo()
{
    console.log("foo");

    var allOptions = $(".menuThing");


    var x = 100;
    for (var i = 0; i < allOptions.length; i++)
    {
        console.log(allOptions[i]);
        var currentPanel = $(allOptions[i]);

        currentPanel.css({left:x+"px",top:"100px",width:"200"});
        var blah = function(arg){
            $(allOptions[arg]).mouseenter(function()
            {
                console.log("Mouse enter " + arg);
                setSelection(arg);
            });
        }(i);
        x+= 200;
    }

    $(allOptions[selected]).css({"z-index":20});
}

function update()
{

    var allOptions = $(".menuThing");
    var x = 100;
    for (var i = 0; i < allOptions.length; i++)
    {
        var currentPanel = $(allOptions[i]);

        if (i !== selected)
        {
            currentPanel.css({left:x+"px",top:"100px",width:"200"});
            x+= 200;
        }
        else if (i === selected)
        {
            currentPanel.css({left:x+"px",top:"70px", width:"400"});
            x+= 400; 

        }
    }
}

function setSelection(index)
{
    var allOptions = $(".menuThing");

    selected = index;
    update();
}