
var React = require('react');

module.exports = ['Servery','CreateRouter',function(Servery,CreateRouter) {

    Servery.all(function(a){

        var main = React.renderComponent(
            CreateRouter(a.result),
            document.body
        );


    });
    
}]
