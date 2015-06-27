app.controller('ForumCtrl', ['$scope', '$stateParams', 'ForumsFactory', '$firebase', 'Auth', function($scope, $stateParams, $ForumsFactory, $firebase, Auth) {

  $scope.user = null;
  $scope.user = Auth.getAuth() && Auth.getAuth().uid;
  console.log($scope.user);
  $scope.forumKey = $stateParams.forumKey;

  

  // Set Forum object to $scope.forum with two way binding
  $ForumsFactory.getForum($scope.forumKey).$bindTo($scope, "forum")
  .then(function() {
    $scope.isModerator = $scope.forum.creatorID === $scope.user;
  });
 
  // Create an array for each question status
  $scope.questionActive = $ForumsFactory.getQuestions($scope.forumKey, 'active');
  $scope.questionsPending = $ForumsFactory.getQuestions($scope.forumKey, 'pending');
  $scope.questionsAnswered = $ForumsFactory.getQuestions($scope.forumKey, 'answered');


  // This function is called when active quesiotn is clicked
  // It clears out the active question and assigns a new active question if possible
  $scope.nextQuestion = function() {
    if ($scope.isModerator) {
      $scope.removeActiveQuestion();
      $scope.getNextActiveQuestion(); 
    }
  };

  // If there is an active question, move it to answered questions array
  // and set active question to null
  $scope.removeActiveQuestion = function() {
    if (!!$scope.questionActive) {
      $scope.questionsAnswered.$add($scope.questionActive[0]);
      $scope.questionActive.$remove(0);
    }
  };

  // Set the active question to the pending question with the highest rank
  // if there are any pending questions
  $scope.getNextActiveQuestion = function() {
    if ($scope.questionsPending.length > 0) {
      var nextQuestion = $scope.questionsPending[0];

      // Loop through pending questions to find question with the highest rank
      for (var i = 1; i < $scope.questionsPending.length; i++) {
        if ($scope.questionsPending[i].rank > nextQuestion.rank) {
          nextQuestion = $scope.questionsPending[i];
        }
      }

      // Remove the next active question from questions pending
      // and add it to questionActive
      $scope.questionsPending.$remove(nextQuestion);
      $scope.questionActive.$add(nextQuestion);
    }
  };


}]);

// Custom directive for pending questions
app.directive('ngPendingQuestion', function() {
  return {
    restrict: 'E',
    template: '<div class="right-content">' +
  '<div class="up arrow-container" ng-show="!isModerator" ng-click="upVote()"></div>' +
  '<div class="rank-container" ng-class="{\'active-rank\': isModerator}">{{question.rank}}</div>' +
  '<div class="down arrow-container" ng-show="!isModerator" ng-click="downVote()"></div>' +
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
        // Save the change to Firebase
        $scope.questionsPending.$save($scope.question);
      };

      $scope.downVote = function() {
        $scope.question.rank--;
        // Save the change to Firebase
        $scope.questionsPending.$save($scope.question);
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
    '<div class="left-content">' +
    '<div class="question-text-container">' +
     '<p>{{question.text}}</p>' +
      '</div>' +
      '<p class="question-name">{{question.name}}</p>' +
    '</div>',   
  };
});