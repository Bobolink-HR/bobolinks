app.controller('ForumCtrl', ['$scope', function($scope) {
  $scope.title = "Example Forum";

  $scope.dummyData = [
    {
      id: "0",
      question: 'Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Ben Steinberg',
      rank: 0
    },
    {
      id: "1",
      question: 'Can you please explain why we need to use an asynchronous callback in the function?  Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Amy Steinberg',
      rank: 0
    },
    {
      id: "2",
      question: 'Can you please explain why we need to use an asynchronous callback in the function?',
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




app.directive('ngQuestion', function() {
  return {
    controller: function($scope) {}
  };
});
app.directive('ngName', function() {
  return {
    controller: function($scope) {}
  };
});
app.directive('ngRank', function() {
  return {
    controller: function($scope) {}
  };
});


app.directive('question', function() {
  return {
    restrict: 'AE',
    require: '?ngQuestion, ?ngName, ?ngRank',
    scope: {
      ngQuestion: '@',
      ngName: '@',
      ngRank: '@'
    },
    template: '<div class="right-content">' +
  '<div class="up arrow-container" ng-click="upVote()"></div>' +
  '<div class="rank-container">{{ngRank}}</div>' +
  '<div class="down arrow-container" ng-click="downVote()"></div>' +
  '</div>  ' +
 ' <div class="left-content">' +
    '<div class="question-text-container">' +
     ' <p>{{ngQuestion}}</p>' +
    '</div>' +
    '<p class="question-name">{{ngName}}</p>' +
  '</div>',
   link: function($scope, element, attribute) {
      $scope.upVote = function() {
        $scope.ngRank++;
        console.log($scope.dummyData);
      };

      $scope.downVote = function() {
        $scope.ngRank--;
      };
    }
   
  };
});

