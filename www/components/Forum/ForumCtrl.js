app.controller('ForumCtrl', ['$scope', 'ForumsFactory', function($scope, ForumsFactory) {
  $scope.title = "Example Forum";

  $scope.dummyData = [
    {
      id: "0",
      text: 'Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Ben Steinberg',
      rank: 0
    },
    {
      id: "1",
      text: 'Can you please explain why we need to use an asynchronous callback in the function?  Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Amy Steinberg',
      rank: 0
    },
    {
      id: "2",
      text: 'Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'John Smith',
      rank: 0
    },
  ];

  $scope.upVote = function(id){
    $scope.dummyData[parseInt(id)].rank++;
  };

  $scope.downVote = function(id) {
    $scope.dummyData[parseInt(id)].rank--;
  };



  



}]);




// app.directive('ngQuestion', function() {
//   return {
//     controller: function($scope) {}
//   };
// });
// app.directive('ngName', function() {
//   return {
//     controller: function($scope) {}
//   };
// });
// app.directive('ngRank', function() {
//   return {
//     controller: function($scope) {}
//   };
// });


app.directive('ngQuestion', function() {
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

