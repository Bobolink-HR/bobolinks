app.controller('NewQuestionCtrl', ['$scope', 'ForumsFactory', '$stateParams', '$state', function($scope, ForumsFactory, $stateParams, $state) {
  
  $scope.title = 'Add Question';

  // Create empty newQuestion object on $scope and set starting rank to 0
  $scope.newQuestion = {};
  $scope.newQuestion.rank = 0;

  $scope.submitQuestion = function() {
    // Set name equal to input or 'Anonymous' if no name was inputted
    $scope.newQuestion.name = $scope.newQuestion.name || 'Anonymous';
    ForumsFactory.addQuestion($stateParams.forumKey, $scope.newQuestion);

    // Go back to the forum view
    $state.go('app.forum', {forumKey: $stateParams.forumKey});
  };

}]);



