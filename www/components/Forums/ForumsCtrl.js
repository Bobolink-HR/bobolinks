app.controller('ForumsCtrl', ['$scope', 'ForumsFactory', function($scope, ForumsFactory) {
  $scope.title = "Example Moderator Forums View";
  $scope.active = true;
  $scope.forums = ForumsFactory.getForums();
  $scope.switchView = function(boolean){
    $scope.active = boolean;
    console.log($scope.active);
  };
}]);
