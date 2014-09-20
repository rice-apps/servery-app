/** @jsx React.DOM */

var React = require('react');

var sidebar= React.createClass({
    render: function() {
        return (
            <div id="sidebar">
            </div>
        );
    };
});

React.renderComponent(
    <sidebar />
);
