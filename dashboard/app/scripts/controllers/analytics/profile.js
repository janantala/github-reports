'use strict';

angular.module('dashboardApp')
.controller('AnalyticsProfileCtrl', ['$scope', 'analytics', '$routeParams', function ($scope, analytics, $routeParams) {
  $scope.analytics = analytics;
  $scope.routeParams = $routeParams;

  $scope.events = ['PushEvent', 'PullRequestEvent', 'IssuesEvent'];
  $scope.dayHours = [];

  for (var h=0; h<24;h++){
    $scope.dayHours.push(h);
  }

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

  $scope.getContributionClass = function(contributions){
    if (contributions == 0) {
      return 'contributions-none';
    }
    else if (contributions / $scope.max <= 0.25) {
      return 'contributions-low';
    }
    else if (contributions / $scope.max <= 0.50) {
      return 'contributions-medium';
    }
    else if (contributions / $scope.max <= 0.75) {
      return 'contributions-high';
    }
    else if (contributions / $scope.max <= 1.00) {
      return 'contributions-most';
    }
  };

  $scope.getTooltip = function(hour, events){
    var html = '';
    events.forEach(function(event){
      html += event + ': ' + hour[event] + '<br />';
    });
    return html;
  };
}]);
