var serveryFilters = angular.module('serveryFilters', [])
 
serveryFilters.filter('dayofweek', function() {
  
  return function(input) {
  	var switchdate = "nothiing";
  	switch(input){
  		case '0':
  			switchdate = "Sun";
  			break;
  		case '1':
  			switchdate =  "Mon";
  			break;
  		case '2':
  			switchdate = "Tue";
  			break;
  		case '3':
  			switchdate = "Wed";
  			break;
  		case '4':
  			switchdate ="Thu";
  			break;
  		case '5':
  			switchdate = "Fri";
  			break;
  		case '6':
  			switchdate = "Sat";
  			break;
  	}
    // Change this so that it return 'Sun' for input = 0 , 'Mon' for input = 1, .... , 'Sat' for input = 6
    // Use the javascript switch statement to do this: http://www.w3schools.com/js/js_switch.asp
  return switchdate;
  };
});



