'use strict';

describe('Controller: AnalyticsUserIdCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var AnalyticsUserIdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnalyticsUserIdCtrl = $controller('AnalyticsUserIdCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
