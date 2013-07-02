'use strict';

angular.module('dashboardApp', ['ngResource', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/analytics/profile.html',
        controller: 'AnalyticsProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
