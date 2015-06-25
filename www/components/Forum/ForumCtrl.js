app.controller('ForumCtrl', ['$scope', '$stateParams', 'ForumsFactory', function($scope, $stateParams, $ForumsFactory) {
  // console.log($stateParams);

  //TODO: Figure out if you can prevent view from loading until the forum data loads
  // $scope.test = $ForumsFactory.getForum('-JsbZ_jVQWJB7K8dG_sn');


  // $scope.test.$loaded(function(data) {
  //   // console.log(data);
  //   $scope.pendingQuestions = data.questions.pending.slice(1);
  //   $scope.answeredQuestions = data.questions.answered;

  // });

  // console.log($ForumsFactory.test());
  $ForumsFactory.getForum('-JsbZ_jVQWJB7K8dG_sn').$bindTo($scope, "test");

  // $scope.test2 = $ForumsFactory.getAnsweredQuestions('-JsbZ_jVQWJB7K8dG_sn');
  // console.log($scope.test2);
  // console.log("AAAA");
  // console.log(test2);
  // $scope.pendingQuestions = $scope.test.id.questions.pending;


  // $scope.title = $scope.test.title;
  $scope.id = '-JsbZ_jVQWJB7K8dG_sn';

  // $scope.alpha = forumData;
  // console.log(forumData);
  // console.log($scope.test.id.questions);


  // This is dummy data
  $scope.forum = {createdAt: "", creatorID: "simplelogin:1", private: false, title: "Ben's Town Hall", 
    questions: {
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
      answered: []
    }
  };

  // console.log($scope.forum);
  $scope.isLoggedIn = true;


  //Fast assignment to question lists and activeQuestion
  $scope.pendingQuestions = $scope.forum.questions.pending;
  $scope.activeQuestion = $scope.forum.questions.active;
  $scope.answeredQuestions = $scope.forum.questions.answered;


  // This function is called when active quesiotn is clicked
  // It clears out the active question and assigns a new active question if possible
  $scope.nextQuestion = function() {
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

// Custom directive for answered questions
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


