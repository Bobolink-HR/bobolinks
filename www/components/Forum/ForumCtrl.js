app.controller('ForumCtrl', ['$scope', 'ForumsFactory', function($scope, ForumsFactory) {
  $scope.title = "Example Forum";


  $scope.forum = {JsWjcMAbUt4dFbqBQUn: {createdAt: "", creatorID: "simplelogin:1", private: false, questions: {
    pending: [{
      id: "0",
      text: 'Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Ben Steinberg',
      rank: 0,
      status: 'pending'
    },
    {
      id: "1",
      text: 'Can you please explain why we need to use an asynchronous callback in the function?  Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Amy Steinberg',
      rank: 0,
      status: 'pending'
    },
    {
      id: "2",
      text: 'Can you please explain why we need to use an asynchronous callback in the function?',
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


  $scope.fetchQuestions = function() {
    $scope.pendingQuestions = $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.pending;
    $scope.activeQuestion = $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.active;
    $scope.answeredQuestions = $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.answered;
  };

  $scope.nextQuestion = function() {
    console.log("B");

     // If there is an active question, move it to answered questions array
     if (!!$scope.activeQuestion) {
      $scope.answeredQuestions.push($scope.activeQuestion);
      $scope.activeQuestion = null;
     }

     // Set active question equal to the pending question with the highest ranking

     // If there are no pending questions, set active question equal to null


     // if (!!$scope.forum.JsWjcMAbUt4dFbqBQUn.questions.pending.length > 0) {
     //  var nextQuestion = $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.pending[0];
     //  for (var i = 1; i < $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.pending.length)
     // }

    // Update scope data
    // $scope.fetchQuestions();
    // console.log($scope.forum.JsWjcMAbUt4dFbqBQUn.questions.answered);
  };


  $scope.fetchQuestions();
  // setTimeout(function() {
  //   console.log("A");
  //   $scope.$apply(function() {
  //     $scope.nextQuestion();
  //     console.log($scope.activeQuestion);
  //   });
    
  // }, 2000);


  // $scope.forum.JsWjcMAbUt4dFbqBQUn.questions.active.unshift({
  //     id: "10",
  //     text: 'This is currently the active question.  Hopefully this will work.',
  //     name: 'Michael Jordan',
  //     rank: 10,
  //     status: 'active'
  //   })
  // console.log("A");
  // console.log($scope.forum.JsWjcMAbUt4dFbqBQUn.questions.active[0]);


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


