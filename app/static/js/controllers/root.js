
angular.module('serveryApp')
.controller('RootController', ['$scope','User','Main','LoginEvent','Servery','ServerySetEvent','Menu',function($scope,User,Main,LoginEvent,Servery,ServerySetEvent,Menu) {

    Servery.all(function(a){

        var main = React.renderComponent(
            Main({serveries: a.result}),
            document.body
        );

        User.current_user(function (done){
            main.setUser(done);
        });

        LoginEvent.addListener(function (user){
            ServerySetEvent.updateMenu();
            main.setUser(user);
        });

        ServerySetEvent.addListener(function (servery,menu){
            main.setServeryAndMenu(servery,menu);
            console.log(servery);
        });
    });
    
}]);