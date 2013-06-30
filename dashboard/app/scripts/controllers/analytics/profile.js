'use strict';

angular.module('dashboardApp')
.controller('AnalyticsProfileCtrl', ['$scope', 'analytics', '$routeParams', function ($scope, analytics, $routeParams) {
  $scope.analytics = analytics;
  $scope.routeParams = $routeParams;

  $scope.events = ['PushEvent', 'PullRequestEvent', 'IssuesEvent'];

  $scope.getTotal = function(item, events){
    var sum = 0;
    events.forEach(function(event){
      sum += item[event];
    });
    return sum;
  };
}]);
