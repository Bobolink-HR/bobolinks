app.controller('AddQuestionCtrl', ['$scope', 'ForumsFactory', function($scope, ForumsFactory) {
  $scope.title = 'Add Question';
 

  $scope.submitQuestion = function() {
    var name = $scope.name || 'Anonymous';
    var text = $scope.text;
    
    //Write code to add question to fourm
  };

}]);




