app.controller('NewQuestionCtrl', ['$scope', '$rootScope', 'ForumsFactory', '$stateParams', function($scope, $rootScope, ForumsFactory, $stateParams) {
  
  $scope.title = 'Add Question';

  // Create empty newQuestion object on $scope and set starting rank to 0
  $scope.newQuestion = {};
  $scope.newQuestion.rank = 0;

  $scope.submitQuestion = function() {

    //if text has been inputted in the question input
    if ($scope.newQuestion.text !== undefined) {
      // Set name equal to input or 'Anonymous' if no name was inputted
      $scope.newQuestion.userID = $rootScope.user.uid;
      $scope.newQuestion.name = $rootScope.user.github.displayName;
      $scope.newQuestion.picture = $rootScope.user.github.cachedUserProfile.avatar_url;
      $scope.newQuestion.githubID = $rootScope.user.github.username;
      $scope.newQuestion.userUrl = $rootScope.user.github.cachedUserProfile.html_url;
      ForumsFactory.addQuestion($stateParams.forumKey, $scope.newQuestion);
      // Go back to the forum view
      $rootScope.goBack();
    }
  };

}]);




