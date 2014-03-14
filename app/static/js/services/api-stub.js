'use strict';

/**
 * Stub services that provide access to the servery API
 */
angular.module('serveryApp').factory('ApiStub', function ($http, $q) {

  /**
   * A factory function for returning a data promise.
   */
  var deferredData = function(data) {
    var deferred = $q.defer();
    deferred.resolve(data);
    return deferred.promise;
  };

  /**
   * A factory function for creating a sample servery.
   */
  var createSampleServery = function () {
    return {
      name: "North",
      image: {
        link: "./static/img/placeholder.jpeg"
      },
      location: {
        lat: 29.721883,
        lng: -95.396546
      },
      colleges_served: ["Martel", "Jones", "Brown"],
      opening_hours: {
        open_now: false,
        periods: [
          {
            "meal": "lunch",
            "open": {
              "day": 0,
              "time": "1130"
            },
            "close": {
              "day": 0,
              "time": "1400"
            }
          },
          {
            "meal": "dinner",
            "open": {
              "day": 0,
              "time": "1700",
            },
            "close": {
              "day": 0,
              "time": "1900"
            }
          }
        ]
      }
    };
  };

  return {
    serveries: function () {
      // Create 6 copies of the same servery with different names
      var serveries = [];
      var serveryNames = [
        "Seibel Servery", 
        "North Servery",
        "South Servery",
        "West Servery",
        "Baker College Kitchen",
        "Sid Richardson College Kitchen"
      ];
      for (var i in serveryNames) {
        var servery = createSampleServery();
        servery.name = serveryNames[i];
        serveries.push(servery);
      }
      return deferredData(serveries);
    }

  };

});