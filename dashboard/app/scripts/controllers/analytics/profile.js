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

  var getMax = function(week, events){
    var max = 0;
    week.forEach(function(day){
      day.forEach(function(hour){
        if (max < $scope.getTotal(hour, events)){
          max = $scope.getTotal(hour, events);
        }
      });
    });
    return max;
  };

  $scope.max = getMax($scope.analytics.weekhoursArr, $scope.events);
}]);
