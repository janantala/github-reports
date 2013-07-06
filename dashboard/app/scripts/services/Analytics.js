'use strict';

angular.module('dashboardApp')
.factory('Analytics', ['$resource', function() {

  return {
    'sse': function(csv, timezone, ondata){
      console.log('sse init');
      var source = new EventSource('/analytics/?csv=' + csv + '&timezone=' + timezone);
      var that = this;
      source.addEventListener('message', function(e) {
        var data = JSON.parse(e.data);
        ondata(data);
      }, false);

      source.addEventListener('error', function(e) {
        source.close();
        if (that.loaded){
          that.loaded();
        }
      }, false);
    },
    'loaded': function(loaded){
      this.loaded = loaded;
    }
  };
}]);
