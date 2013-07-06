'use strict';

angular.module('dashboardApp')
.factory('Analytics', ['$resource', function() {

  return {
    'sse': function(csv, timezone, ondata){
      console.log('sse init');
      var source = new EventSource('/analytics/?csv=' + csv + '&timezone=' + timezone);

      source.addEventListener('message', function(e) {
        var data = JSON.parse(e.data);
        ondata(data);
      }, false);

      source.addEventListener('error', function(e) {
       source.close();
      }, false);
    }
  };
}]);
