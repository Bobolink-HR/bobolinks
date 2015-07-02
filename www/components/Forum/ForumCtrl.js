app.controller('ForumCtrl', function($scope, $stateParams, ForumsFactory, $firebase, Auth, $ionicSideMenuDelegate) {
  // Initially user is set to null
  // Set isDrawing to false;
  $scope.user = null;
  $scope.isDrawing = false;
  $scope.pollAvailable = false;

  $scope.formData = {};

  // If Auth.getAuth is not undefined, set user to current user id
  // We need the current user id to check if the user is the moderator
  $scope.user = Auth.getAuth() && Auth.getAuth().uid;

  // If user is not logged in, hide the side nav bar
  $ionicSideMenuDelegate.canDragContent(!!$scope.user);


  $scope.forumKey = $stateParams.forumKey;

  // Set Forum object to $scope.forum with two way binding
  ForumsFactory.getForum($scope.forumKey)
  .$bindTo($scope, "forum")
  .then(function() {
    // Assign the title to the top nav bar
    $scope.forumKey = $scope.forum.forumKey; // This might be undefined and might not be used... research later.
    $scope.showDrawing = false;
    $scope.title = $scope.forum.title;
    $scope.drawing = $scope.forum.drawing;

    // If the forum's creator id equals the current user id, the user is the moderator
    $scope.isModerator = $scope.forum.creatorID === $scope.user;

    // If the user is the moderator or there is not a password, the user has access
    // If both of these conditions fail, the main forum content is hiddent and the user
    // is asked to enter the forum password
    $scope.forumAccess = $scope.isModerator || !$scope.forum.password;
  });



  // Create an array for each question status
  $scope.questionActive = ForumsFactory.getQuestions($scope.forumKey, 'active');
  $scope.questionsPending = ForumsFactory.getQuestions($scope.forumKey, 'pending');
  $scope.questionsPending.$loaded(function() {
    $scope.updateActiveQuestionContainerText();
  });
  $scope.questionsAnswered = ForumsFactory.getQuestions($scope.forumKey, 'answered');


  $scope.polls = ForumsFactory.getPolls($scope.forumKey);


  /*
  * DRAWING FUNCTIONALITY
  */ 
  $('#simple_sketch').sketch();
  var imageToDataUrl = function() {
    var canvas = document.getElementById("simple_sketch");
    var myImage = canvas.toDataURL();
    return myImage;
  };
  $scope.toggleShowDrawing = function() {
    $scope.showDrawing = !$scope.showDrawing;
  };
  $scope.showCanvas = function() {
    $scope.isDrawing = !$scope.isDrawing;
  };
  $scope.saveDrawing = function() {
    var forum = ForumsFactory.getForum($stateParams.forumKey);
    forum.$loaded().then(function() {
      forum.drawing = $('#simple_sketch').get(0).toDataURL();
      forum.$save();
      $scope.drawing = forum.drawing;
    });
  };


  // This function is called when active quesiotn is clicked
  // It clears out the active question and assigns a new active question if possible
  $scope.nextQuestion = function() {
    if ($scope.isModerator) {
      $scope.removeActiveQuestion();
      $scope.getNextActiveQuestion();
      $scope.updateActiveQuestionContainerText();
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

  // Check submitted password.  If it is valid, show forum content, otherwise clear password entered
  $scope.submitPassword = function() {
    $scope.forumAccess = $scope.forum.password === $scope.formData.password;

    if (!$scope.forumAccess) {
      $scope.formData.password = "";
    }
  };

  // Updates the activeQuestionStatus that is shown when there is no active question
  $scope.updateActiveQuestionContainerText = function() {
    if ($scope.questionsPending.length > 0) {
      return "Tap for next question";
    } else {
      return "No remaining questions";
    }
  };

  $scope.togglePendingQuestions = function(event) {
    if ($('.pending-questions-container').is(':visible') ) {
      $('.pending-questions-container').slideUp();
      
    } else {
      $('.pending-questions-container').slideDown();
    }

    $('.pending-arrow').toggleClass('rotated');


  };

  $scope.toggleAnsweredQuestions = function(event) {
    if ($('.answered-questions-container').is(':visible') ) {
      $('.answered-questions-container').slideUp();

    } else {
      $('.answered-questions-container').slideDown();
    }

    $('.answered-arrow').toggleClass('rotated');
  };

  $scope.createPoll = function(newPoll) {
    ForumsFactory.addPoll($scope.forumKey, newPoll);
  };
});

// Custom directive for pending questions
app.directive('ngPendingQuestion', function() {
  return {
    restrict: 'E',
    template: '<div class="right-content">' +
  '<div class="up up-arrow-container" ng-show="!isModerator" ng-click="upVote($event)"></div>' +
  '<div class="pending-rank rank-container" ng-class="{\'moderator-pending-rank\': isModerator}">{{question.rank}}</div>' +
  '<div class="down down-arrow-container" ng-show="!isModerator" ng-click="downVote()"></div>' +
  '</div>  ' +
 ' <div class="left-content">' +
    '<div class="question-text-container">' +
     ' <p>{{question.text}}</p>' +
    '</div>' +
    '<p class="question-name">{{question.name}}</p>' +
  '</div>',
   link: function($scope, element, attribute) {
      $scope.upVote = function(event) {
        if (!$(event.target).parent().hasClass('upvoted')) {
          if ($(event.target).parent().hasClass('downvoted')) {
            $(event.target).parent().removeClass('downvoted');
            $(event.target).parent().find('.down').removeClass('down-clicked');
          } else {
            $(event.target).parent().addClass('upvoted');
            $(event.target).addClass('up-clicked');
          }
          $scope.question.rank++;
        }
       

        // Save the change to Firebase
        $scope.questionsPending.$save($scope.question);
      };

      $scope.downVote = function() {
        if (!$(event.target).parent().hasClass('downvoted')) {
          if ($(event.target).parent().hasClass('upvoted')) {
            $(event.target).parent().removeClass('upvoted');
            $(event.target).parent().find('.up').removeClass('up-clicked');
          } else {
            $(event.target).parent().addClass('downvoted');
            $(event.target).addClass('down-clicked');
          }
          $scope.question.rank--;
        }

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
    '<div class="rank-container answered-rank">{{question.rank}}</div>' +
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

// Custom directive for pending questions
app.directive('ngPoll', function() {
  return {
    restrict: 'E',
    template:
     '<p>{{poll.text}}</p>' + 
     '<p>SCORE: {{poll.rank}}' +
      '<form class="poll-response-form" ng-show="!isModerator">' + 
        '<button ng-click="upVote()">UP VOTE</button>' + 
        '<button ng-click="downVote()">DOWN VOTE</button>' +
      '</form>' +
      '<hr>',
   link: function($scope, element, attribute) {
      $scope.upVote = function() {
        // if (!$(event.target).parent().hasClass('upvoted')) {
        //   if ($(event.target).parent().hasClass('downvoted')) {
        //     $(event.target).parent().removeClass('downvoted');
        //     $(event.target).parent().find('.down').removeClass('down-clicked');
        //   } else {
        //     $(event.target).parent().addClass('upvoted');
        //     $(event.target).addClass('up-clicked');
        //   }
        //   $scope.question.rank++;
        // }
        if($scope.class !== 'upVoted') {
          if($scope.class === 'downVoted') {
            $scope.class = 'neutral';
          } else {
            $scope.class = 'upVoted';
          }
          $scope.poll.rank++;
          // Save the change to Firebase
          $scope.polls.$save($scope.poll);
        }

      };

      $scope.downVote = function() {
        // if (!$(event.target).parent().hasClass('downvoted')) {
        //   if ($(event.target).parent().hasClass('upvoted')) {
        //     $(event.target).parent().removeClass('upvoted');
        //     $(event.target).parent().find('.up').removeClass('up-clicked');
        //   } else {
        //     $(event.target).parent().addClass('downvoted');
        //     $(event.target).addClass('down-clicked');
        //   }
        //   $scope.question.rank--;
        // }
        if($scope.class !== 'downVoted') {
          if($scope.class === 'upVoted') {
            $scope.class = 'neutral';
          } else {
            $scope.class = 'downVoted';
          }
          $scope.poll.rank--;
          // Save the change to Firebase
          $scope.polls.$save($scope.poll);
        }
      };
    }
  };
});
