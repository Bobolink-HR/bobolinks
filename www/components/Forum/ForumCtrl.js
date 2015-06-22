app.controller('ForumCtrl', ['$scope', function($scope) {
  $scope.title = "Example Forum";

  $scope.dummyData = [
    {
      question: 'Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Ben Steinberg',
      rank: 0
    },
    {
      question: 'Can you please explain why we need to use an asynchronous callback in the function?  Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Ben Steinberg',
      rank: 0
    },
    {
      question: 'Can you please explain why we need to use an asynchronous callback in the function?',
      name: 'Ben Steinberg',
      rank: 0
    },
  ]

}]);


app.directive('question', function() {
  return {
    restrict: 'A',
    require: 'ngQuestion, ngName, ngRank',
    scope: {
      ngQuestion: '@',
      ngName: '@',
      ngRank: '@'
    },
    template: '<div class="question">' +
  '<div class="right-content">' +
  '<div class="up arrow-container"></div>' +
  '<div class="rank-container">{{ngRank}}</div>' +
  '<div class="down arrow-container"></div>' +
  '</div>  ' +
 ' <div class="left-content">' +
    '<div class="question-text-container">' +
     ' <p>{{ngQuestion}}</p>' +
    '</div>' +
    '<p class="question-name">{{ngName}}</p>' +
  '</div>' +
'</div>'
  }
})