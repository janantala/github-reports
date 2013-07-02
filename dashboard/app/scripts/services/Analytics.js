'use strict';

angular.module('dashboardApp')
.factory('Analytics', ['$resource', function($resource) {
  return $resource('http://localhost:port/analytics', { port: ':3000', timezone: '@timezone', csv: '@csv' }, {
    'get'   : { method: 'GET', params: { } }
  });
}]);
