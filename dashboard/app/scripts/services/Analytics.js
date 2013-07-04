'use strict';

angular.module('dashboardApp')
.factory('Analytics', ['$resource', function($resource) {
  return $resource('/analytics', { timezone: '@timezone', csv: '@csv' }, {
    'get'   : { method: 'GET', params: { } }
  });
}]);
