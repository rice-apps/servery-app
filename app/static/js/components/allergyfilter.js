/** @jsx React.DOM */

angular.module('serveryApp').factory('AllergyFilter',['FilterStore', function(FilterStore){

var AllergyFilter = React.createClass({
    onFilterChange: function(type,event){
        FilterStore.setFilter(type,event.target.checked);
    },
    render: function(){
        return (
            <div className="inline checkbox">
                <label className="allergyFilterLabel">
                    <h5 className="inline noMargin">
                        {this.props.allergyName} Only 
                        &nbsp;
                        <img src={"/static/img/" + this.props.allergyType +".png"} className="allergyIcon inline noMargin"/>
                        &nbsp;
                    </h5>
                    <input type="checkbox" className="foodFilterCheckbox" onChange={this.onFilterChange.bind(this,this.props.allergyType)} checked={this.props.allergyValue}/>
                </label>            
            </div> 
            );
    }
});

return AllergyFilter;

}]);
