var React = require('react');
var CreateRouter = require('./components/router');

$(document).ready(function() {
    $.get('/api/serveries').done(function(serveryData){
        var main = React.renderComponent(
            CreateRouter(serveryData.result),
            document.body
        );
    });
});