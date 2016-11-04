/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 *
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 *
 * You can leave the controller empty if you do not need it.
 */
function ($scope) {



  $scope.buildEventTitle = function(event) {
    return $scope.$eval($scope.properties.eventsTitleExpression, {"event": event});
  };

  $scope.buildEventTime = function(event) {
    return $scope.$eval($scope.properties.eventsTimeExpression, {"event": event});
  };

  $scope.buildEventAuthor = function(event) {
    return $scope.$eval($scope.properties.eventsAuthorExpression, {"event": event});
  };

  $scope.buildEventContent = function(event) {
    return $scope.$eval($scope.properties.eventsContentExpression, {"event": event});
  };


  // ------------
  // -- Origin --
  // ------------

  $scope.buildOriginTitle = function() {
      return $scope.$eval($scope.properties.originTitleExpression, {"origin": $scope.properties.origin});
  };

  $scope.buildOriginTime = function() {
    return $scope.$eval($scope.properties.originTimeExpression, {"origin": $scope.properties.origin});
  };

  $scope.buildOriginAuthor = function() {
    return $scope.$eval($scope.properties.originAuthorExpression, {"origin": $scope.properties.origin});
  };

  $scope.buildOriginContent = function() {
    return $scope.$eval($scope.properties.originContentExpression, {"origin": $scope.properties.origin});
  };

}
