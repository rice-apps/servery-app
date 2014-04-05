var serveryFilters = angular.module('serveryFilters', [])
 
serveryFilters.filter('dayofweek', function() {
  
  return function(input) {
  	var day;
  	switch(input){
  		case '0':
  			day = "Sun";
  			break;
  		case '1':
  			day =  "Mon";
  			break;
  		case '2':
  			day = "Tue";
  			break;
  		case '3':
  			day = "Wed";
  			break;
  		case '4':
  			day ="Thu";
  			break;
  		case '5':
  			day = "Fri";
  			break;
  		case '6':
  			day = "Sat";
  			break;
  	}
  return day;
  };
});

// serveryFilters.filter('12hour', function () {
//   return function(input) {
//     // Filter code goes here
//   };
// });

