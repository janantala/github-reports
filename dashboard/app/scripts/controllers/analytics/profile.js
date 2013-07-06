'use strict';

angular.module('dashboardApp')
.controller('AnalyticsProfileCtrl', ['$scope', '$routeParams', 'Analytics', function ($scope, $routeParams, Analytics) {

  var classes = ['PushEvent', 'PullRequestEvent', 'IssuesEvent'];
  var initArray = function(arraySize, classes){
    var array = [];
    while(arraySize--) {
      var obj = {};
      classes.forEach(function(c){ obj[c] = 0; });
      array.push(obj);
    }
    return array;
  };

  var yearArr = initArray(12, classes);
  var weekArr = initArray(7, classes);
  var dayArr = initArray(24, classes);
  var weekhoursArr = [initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes)];

  $scope.analytics = {
    'yearArr': yearArr,
    'weekArr': weekArr,
    'dayArr': dayArr,
    'weekhoursArr': weekhoursArr
  };
  $scope.report = window.report || { 'profile': '', 'file': '', 'timezone': '' };

  Analytics.sse($scope.report.file, $scope.report.timezone, function(analytics){
    console.log(analytics);
    $scope.analytics = analytics;
    $scope.changeEvents();
    $scope.$apply();
  });

  $scope.events = ['PushEvent', 'PullRequestEvent', 'IssuesEvent'];
  $scope.dayHours = [];
  $scope.hours = [];
  $scope.days = [];
  $scope.months = [];
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

  $scope.checkEvent = {
    push: true,
    pullrequest: true,
    issues: true
  };

  $scope.changeEvents = function(){
    var events = [];
    if ($scope.checkEvent.push) {
      events.push('PushEvent');
    }
    if ($scope.checkEvent.pullrequest) {
      events.push('PullRequestEvent');
    }
    if ($scope.checkEvent.issues) {
      events.push('IssuesEvent');
    }

    $scope.events = events;

    $scope.maxYear = getMax($scope.analytics.yearArr, $scope.events);
    $scope.maxWeek = getMax($scope.analytics.weekArr, $scope.events);
    $scope.maxDay = getMax($scope.analytics.dayArr, $scope.events);
    $scope.maxWeekHours = getMaxDouble($scope.analytics.weekhoursArr, $scope.events);
  };

  for (var dh=0; dh<24;dh++){
    $scope.dayHours.push(dh);
  }

  for (var h=0; h<24;h++){
    $scope.hours.push(h);
  }

  for (var d=0; d<7;d++){
    $scope.days.push(d);
  }

  for (var m=0; m<12;m++){
    $scope.months.push(m);
  }

  $scope.getTotal = function(item, events){
    var sum = 0;
    events.forEach(function(event){
      sum += item[event];
    });
    return sum;
  };

  var getMax = function(arr, events){
    var max = 0;
    arr.forEach(function(item){
      if (max < $scope.getTotal(item, events)){
        max = $scope.getTotal(item, events);
      }
    });
    return max;
  };

  var getMaxDouble = function(week, events){
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

  $scope.maxYear = getMax($scope.analytics.yearArr, $scope.events);
  $scope.maxWeek = getMax($scope.analytics.weekArr, $scope.events);
  $scope.maxDay = getMax($scope.analytics.dayArr, $scope.events);
  $scope.maxWeekHours = getMaxDouble($scope.analytics.weekhoursArr, $scope.events);

  $scope.getContributionClass = function(contributions, max){
    if (contributions == 0) {
      return 'contributions-none';
    }
    else if (contributions / max <= 0.25) {
      return 'contributions-low';
    }
    else if (contributions / max <= 0.50) {
      return 'contributions-medium';
    }
    else if (contributions / max <= 0.75) {
      return 'contributions-high';
    }
    else if (contributions / max <= 1.00) {
      return 'contributions-most';
    }
  };

  $scope.getTooltip = function(item, events){
    var html = '';
    html += 'Contributions: ' + $scope.getTotal(item, events) + '<br />';
    events.forEach(function(event){
      html += event + ': ' + item[event] + '<br />';
    });
    return html;
  };
}]);
