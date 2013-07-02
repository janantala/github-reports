'use strict';

angular.module('dashboardApp')
.factory('Analytics', ['$resource', function($resource) {
  return $resource('http://localhost:port/analytics/:profile', { port: ':3000', profile: '@profile' }, {
    'get'   : { method: 'GET', params: { } }
  });
}]);
