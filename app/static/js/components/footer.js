/** @jsx React.DOM */

var React = require('react');

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

module.exports = Footer;