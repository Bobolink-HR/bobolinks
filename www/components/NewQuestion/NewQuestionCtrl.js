app.controller('NewQuestionCtrl', ['$scope', 'ForumsFactory', '$stateParams', '$location', function($scope, ForumsFactory, $stateParams, $location) {
  
  $scope.title = 'Add Question';
  $scope.newQuestion = {};
  $scope.newQuestion.rank = 0;

  $scope.submitQuestion = function() {
    $scope.newQuestion.name = $scope.newQuestion.name || 'Anonymous';
    console.log($scope.newQuestion);
    ForumsFactory.addQuestion($stateParams.forumKey, $scope.newQuestion);
    $location.url('/forum/' + $stateParams.forumKey);
    
    //Write code to add question to fourm
  };

}]);




