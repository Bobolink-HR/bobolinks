app.controller('ForumCtrl', ['$scope', 'ForumsFactory', function($scope, ForumsFactory) {
  $scope.title = "Example Forum";


  $scope.forum = {JsWjcMAbUt4dFbqBQUn: {createdAt: "", creatorID: "simplelogin:1", private: false, questions: {
    pending: [{
      id: "0",
      text: 'AAACan you please explain why we need to use an asynchronous callback in the function?',
      name: 'Ben Steinberg',
      rank: 0,
      status: 'pending'
    },
    {
      id: "1",
      text: 'BBBCan you please explain why we need to use an asynchronous callback in the function?  Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Amy Steinberg',
      rank: 0,
      status: 'pending'
    },
    {
      id: "2",
      text: 'CCCCan you please explain why we need to use an asynchronous callback in the function?',
      name: 'John Smith',
      rank: 0,
      status: 'pending'
    }], 
    active: {
      id: "6",
      text: 'This is currently the active question.  Hopefully this will work.',
      name: 'Michael Jordan',
      rank: 5,
      status: 'active'
    }, 
    answered: []}
  }};


  $scope.pendingQuestions = $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.pending;
  $scope.activeQuestion = $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.active;
  $scope.answeredQuestions = $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.answered;

  $scope.nextQuestion = function() {
    console.log("B");
    $scope.removeActiveQuestion();
    $scope.getNextActiveQuestion();
  };

  // If there is an active question, move it to answered questions array
  // and set active question to null
  $scope.removeActiveQuestion = function() {
    if (!!$scope.activeQuestion) {
      $scope.answeredQuestions.push($scope.activeQuestion);
      $scope.activeQuestion = null;
    }
  };

  // Set the active question to the pending question with the highest rank
  // if there are any pending questions
  $scope.getNextActiveQuestion = function() {
    if ($scope.pendingQuestions.length > 0) {
      var nextQuestion = $scope.pendingQuestions.shift();

      for (var i = 0; i < $scope.pendingQuestions.length; i++) {
        if ($scope.pendingQuestions[i].rank > nextQuestion.rank) {
          $scope.pendingQuestions.push(nextQuestion);
          nextQuestion = $scope.pendingQuestions[i];
        }
      }
      $scope.activeQuestion = nextQuestion;
    }
  };
}]);

app.directive('ngPendingQuestion', function() {
  return {
    restrict: 'E',
    scope: {
      question: '='
    },
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
   link: function(scope, element, attribute) {
      scope.upVote = function() {
        scope.question.rank++;
      };

      scope.downVote = function() {
        scope.question.rank--;
      };
    }
   
  };
});

app.directive('ngAnsweredQuestion', function() {
  return {
    restrict: 'E',
    scope: {
      question: '='
    },
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
   link: function(scope, element, attribute) {
      scope.upVote = function() {
        scope.question.rank++;
      };

      scope.downVote = function() {
        scope.question.rank--;
      };
    }
   
  };
});


