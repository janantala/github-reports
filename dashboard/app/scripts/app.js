'use strict';

angular.module('dashboardApp', ['ngResource', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/analytics/:profile', {
        templateUrl: 'views/analytics/profile.html',
        controller: 'AnalyticsProfileCtrl',
        resolve: {
          analytics: function($q, $route, Analytics){
            var deferred = $q.defer();
            Analytics.get({'profile': $route.current.params.profile},
            function(analytics){
              console.log(analytics);
              deferred.resolve(analytics);
            },
            function(){
              deferred.reject();
            });

            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
