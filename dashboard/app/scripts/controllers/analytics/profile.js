'use strict';

angular.module('dashboardApp')
.controller('AnalyticsProfileCtrl', ['$scope', 'analytics', '$routeParams', function ($scope, analytics, $routeParams) {
  $scope.analytics = analytics;
  $scope.routeParams = $routeParams;
}]);
