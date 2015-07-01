app.controller('NewPollCtrl', ['$scope', '$rootScope', 'ForumsFactory', '$stateParams', function($scope, $rootScope, ForumsFactory, $stateParams) {
  
  $scope.title = 'Add Poll';

  // Create empty newPoll object on $scope and set starting rank to 0
  $scope.newPoll = {};
  $scope.newPoll.rank = 0;

  $scope.submitPoll = function() {

    //if text has been inputted in the Poll input
    if ($scope.newPoll.text !== undefined) {
      // Set name equal to input or 'Anonymous' if no name was inputted
      $scope.newPoll.name = $scope.newPoll.name || 'Anonymous';
      ForumsFactory.addPoll($stateParams.forumKey, $scope.newPoll);
      // Go back to the forum view
      $rootScope.goBack();
    }
  };

}]);




