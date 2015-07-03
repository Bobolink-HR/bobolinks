app.controller('RespondToPollCtrl', ['$scope', '$rootScope', 'ForumsFactory', '$stateParams', function($scope, $rootScope, ForumsFactory, $stateParams) {
  $scope.poll = ForumsFactory.getPolls($stateParams.forumKey);
  $scope.response = 0;

  $scope.setResponse = function(value) {
    $scope.response = value;
  }

  $scope.respond = function() {
    if($scope.response !== 0) {
      var response = {value: $scope.response, username: $rootScope.user.github.username}
      ForumsFactory.addResponse(response, $stateParams.forumKey);
      $rootScope.goBack();
    }
  };
}]);
