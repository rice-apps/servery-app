function twelvehour(input) {
  if (input == undefined)
      return ""
  var hour = parseInt(input.substr(0,2));
  var minutes = input.substr(3,2);
  if (hour > 12){
      hour = hour - 12;
      return (hour.toString() + ":" + minutes + " PM");
 
  }
  else {
      return (finalString = hour.toString() + ":" + minutes + " AM");

  }

}

module.exports = {
    "twelvehour": twelvehour
}