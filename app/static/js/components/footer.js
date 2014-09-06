/** @jsx React.DOM */
var angular = require('lib/angular/angular.js');
var React= require('lib/react.js');
var Footer = React.createClass({
    render: function() {
        return (
            <footer>
                <div className="row">
                    <div className="col-lg-12">

                        <p>
                            Made by <a href="http://csclub.rice.edu/riceapps">Rice Apps</a>. 
                            View code <a href="http://github.com/rice-apps">here</a>.
                        </p>
                        
                    </div>
                </div>
    
            </footer>
        );
    }
});
    
