'use strict';

angular.module('dashboardApp')
.factory('Analytics', ['$resource', function($resource) {
  return $resource('http://github.profile.dev/analytics', { timezone: '@timezone', csv: '@csv' }, {
    'get'   : { method: 'GET', params: { } }
  });
}]);
