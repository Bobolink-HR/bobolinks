app.controller('ForumCtrl', ['$scope', '$stateParams', 'ForumsFactory', '$firebase', function($scope, $stateParams, $ForumsFactory, $firebase) {
  // console.log($stateParams);





  // $ForumsFactory.getQuestions('-JsbZ_jVQWJB7K8dG_sn', 'pending').$bindTo($scope, "pending");
  // $ForumsFactory.getQuestions('-JsbZ_jVQWJB7K8dG_sn').$bindTo($scope, "test");

  // $scope.questionActive = $ForumsFactory.getQuestions('-JsbZ_jVQWJB7K8dG_sn', 'active');
  $scope.questionsPending = $ForumsFactory.getQuestions('-JsbZ_jVQWJB7K8dG_sn', 'pending');
 
  // $scope.questionsAnswered = $ForumsFactory.getQuestions('-JsbZ_jVQWJB7K8dG_sn', 'answered');

  // console.log()
  // $scope.test.$loaded(function(data) {
  //   // console.log(data);
  //   $scope.pendingQuestions = data.questions.pending.slice(1);
  //   $scope.answeredQuestions = data.questions.answered;

  // });

  // console.log($ForumsFactory.getQuestions('-JsbZ_jVQWJB7K8dG_sn', 'pending'));
  // $ForumsFactory.getForum('-JsbZ_jVQWJB7K8dG_sn').$bindTo($scope, "test");

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
  // $scope.forum = {createdAt: "", creatorID: "simplelogin:1", private: false, title: "Ben's Town Hall", 
  //   questions: {
  //     pending: [{
  //       id: "0",
  //       text: 'AAACan you please explain why we need to use an asynchronous callback in the function?',
  //       name: 'Ben Steinberg',
  //       rank: 0,
  //       status: 'pending'
  //     },
  //     {
  //       id: "1",
  //       text: 'BBBCan you please explain why we need to use an asynchronous callback in the function?  Can you please explain why we need to use an asynchronous callback in the function?',
  //       name: 'Amy Steinberg',
  //       rank: 0,
  //       status: 'pending'
  //     },
  //     {
  //       id: "2",
  //       text: 'CCCCan you please explain why we need to use an asynchronous callback in the function?',
  //       name: 'John Smith',
  //       rank: 0,
  //       status: 'pending'
  //     }], 
  //     active: {
  //       id: "6",
  //       text: 'This is currently the active question.  Hopefully this will work.',
  //       name: 'Michael Jordan',
  //       rank: 5,
  //       status: 'active'
  //     }, 
  //     answered: []
  //   }
  // };

  // console.log($scope.forum);
  $scope.isLoggedIn = true;



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
  };
});


