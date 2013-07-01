'use strict';

angular.module('dashboardApp')
.controller('AnalyticsProfileCtrl', ['$scope', 'analytics', '$routeParams', function ($scope, analytics, $routeParams) {
  $scope.analytics = analytics;
  $scope.routeParams = $routeParams;

  $scope.events = ['PushEvent', 'PullRequestEvent', 'IssuesEvent'];
  $scope.dayHours = [];
  $scope.strings = {
    "DAY": {
      "0": "Sunday",
      "1": "Monday",
      "2": "Tuesday",
      "3": "Wednesday",
      "4": "Thursday",
      "5": "Friday",
      "6": "Saturday"
    },
    "MONTH": {
      "0": "January",
      "1": "February",
      "2": "March",
      "3": "April",
      "4": "May",
      "5": "June",
      "6": "July",
      "7": "August",
      "8": "September",
      "9": "October",
      "10": "November",
      "11": "December"
    },
    "SHORTDAY": {
      "0": "Sun",
      "1": "Mon",
      "2": "Tue",
      "3": "Wed",
      "4": "Thu",
      "5": "Fri",
      "6": "Sat"
    },
    "SHORTMONTH": {
      "0": "Jan",
      "1": "Feb",
      "2": "Mar",
      "3": "Apr",
      "4": "May",
      "5": "Jun",
      "6": "Jul",
      "7": "Aug",
      "8": "Sep",
      "9": "Oct",
      "10": "Nov",
      "11": "Dec"
    }
  };

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
