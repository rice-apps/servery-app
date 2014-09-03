
angular.module('serveryApp')
.controller('RootController', ['$scope','User','Main','LoginEvent','Servery','ServerySetEvent','CreateRouter',function($scope,User,Main,LoginEvent,Servery,ServerySetEvent,CreateRouter) {

    Servery.all(function(a){

        

        var main = React.renderComponent(
            CreateRouter(a.result),
            document.body
        );


    });
    
}]);