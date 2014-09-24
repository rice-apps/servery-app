/** @jsx React.DOM */

var React = require('react');

var meals = ['breakfast', 'lunch', 'dinner'];

  
function dayofweek(input) {
    var day;
    switch(input){
        case '0':
            day =  "Mon";
            break;
        case '1':
            day = "Tue";
            break;
        case '2':
            day = "Wed";
            break;
        case '3':
            day ="Thu";
            break;
        case '4':
            day = "Fri";
            break;
        case '5':
            day = "Sat";
            break;
        case '6':
            day = "Sun";
            break;
    }
  return day;
}

var twelvehour = require('./utils').twelvehour


module.exports = React.createClass({

    render: function() {
        return (
            <div className="panel panel-default">
              <div className="panel-heading">
                Hours
                {
                    this.props.servery.open_now ? 
                    (<span className="label label-success">
                        Currently Open
                    </span>) :

                    (<span className="label label-default">
                        Currently Closed
                    </span>)
                }
              </div>
              <table className="table">
                <tbody>
                    <tr> {/* Meal headers */}
                      <td></td>
                      {meals.map(function(meal){
                        return (
                            <th key={meal}>{meal}</th>);
                      })}
                    </tr>
                    {this.props.servery.hours && Object.keys(this.props.servery.hours).map(function(period){
                        return (
                            <tr key={period}>
                              <td> {dayofweek(period)} </td>
                              {meals.map(function(meal){
                                return (
                                    <td key={meal}>
                                    {
                                        this.props.servery.hours[period][meal] && 
                                        (<span>
                                            {twelvehour(this.props.servery.hours[period][meal].start_time)} -  {twelvehour(this.props.servery.hours[period][meal].end_time)}
                                        </span>)
                                    }
                                        
                                    </td>
                                    );
                              },this)}
                            </tr>
                            );
                    },this)}
                </tbody>
              </table>               
            </div>);
    }
});
