var angular = require('lib/angular/angular.js');
var React= require('lib/react.js');
angular.module('serveryApp')
.controller('RootController', ['Servery','CreateRouter',function(Servery,CreateRouter) {

    Servery.all(function(a){

        

        var main = React.renderComponent(
            CreateRouter(a.result),
            document.body
        );


    });
    
}]);
