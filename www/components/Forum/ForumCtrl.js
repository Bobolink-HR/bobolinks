app.controller('ForumCtrl', ['$scope', '$stateParams', 'ForumsFactory', '$firebase', function($scope, $stateParams, $ForumsFactory, $firebase) {

  var forumId = $stateParams.forumid;

   /////////////////////
   /// BEGIN PLACEHOLDER
   ////////////////////
  forumId = '-JsbZ_jVQWJB7K8dG_sn'; // For testing purposes only
  $scope.isLoggedIn = true;
  /////////////////////
   /// END PLACEHOLDER
   ////////////////////

  // Set Forum object to $scope.forum with two way binding
  $ForumsFactory.getForum('-JsbZ_jVQWJB7K8dG_sn').$bindTo($scope, "forum");

  // Create an array for each question status
  $scope.questionActive = $ForumsFactory.getQuestions(forumId, 'active');
  $scope.questionsPending = $ForumsFactory.getQuestions(forumId, 'pending');
  $scope.questionsAnswered = $ForumsFactory.getQuestions(forumId, 'answered');




  // This function is called when active quesiotn is clicked
  // It clears out the active question and assigns a new active question if possible
  $scope.nextQuestion = function() {
    $scope.removeActiveQuestion();
    // $scope.getNextActiveQuestion();
  };

  // If there is an active question, move it to answered questions array
  // and set active question to null
  $scope.removeActiveQuestion = function() {
    if (!!$scope.questionActive) {
      console.log($scope.questionActive);
      $scope.questionsAnswered.$add($scope.questionActive[0]);
      // $scope.questionActive.$remove(0);
    }
  };

  // Set the active question to the pending question with the highest rank
  // if there are any pending questions
  $scope.getNextActiveQuestion = function() {
    if ($scope.pendingQuestions.length > 0) {
      var nextQuestion = $scope.pendingQuestions.shift();
      var temp;

      for (var i = 0; i < $scope.pendingQuestions.length; i++) {
        if ($scope.pendingQuestions[i].rank > nextQuestion.rank) {
          temp = $scope.pendingQuestions[i];
          $scope.pendingQuestions[i] = nextQuestion;
          nextQuestion = temp;
        }
      }
      $scope.activeQuestion = nextQuestion;
    }
  };


}]);

// Custom directive for pending questions
app.directive('ngPendingQuestion', function() {
  return {
    restrict: 'E',
    template: '<div class="right-content">' +
  '<div class="up arrow-container" ng-click="upVote()"></div>' +
  '<div class="rank-container">{{question.rank}}</div>' +
  '<div class="down arrow-container" ng-click="downVote()"></div>' +
  '</div>  ' +
 ' <div class="left-content">' +
    '<div class="question-text-container">' +
     ' <p>{{question.text}}</p>' +
    '</div>' +
    '<p class="question-name">{{question.name}}</p>' +
  '</div>',
   link: function($scope, element, attribute) {
      $scope.upVote = function() {
        $scope.question.rank++;
        // Find the index of question in questionsPending array and save that index
        // By saving the index, we update the data in Firebase
        var pendingQuestionIndex = $scope.questionsPending.$indexFor($scope.question.id);
        $scope.questionsPending.$save(pendingQuestionIndex);
      };

      $scope.downVote = function() {
        $scope.question.rank--;
        // Find the index of question in questionsPending array and save that index
        // By saving the index, we update the data in Firebase
        var pendingQuestionIndex = $scope.questionsPending.$indexFor($scope.question.id);
        $scope.questionsPending.$save(pendingQuestionIndex);
      };
    }
   
  };
});

// Custom directive for answered questions
app.directive('ngAnsweredQuestion', function() {
  return {
    restrict: 'E',
    template: '<div class="right-content">' +
    '<div class="up arrow-container active-arrow" ng-click="upVote()"></div>' +
    '<div class="rank-container active-rank">{{question.rank}}</div>' +
    '<div class="down arrow-container active-arrow" ng-click="downVote()"></div>' +
    '</div>  ' +
    ' <div class="left-content">' +
    '<div class="question-text-container">' +
     ' <p>{{question.text}}</p>' +
      '</div>' +
      '<p class="question-name">{{question.name}}</p>' +
     '</div>',   
  };
});


