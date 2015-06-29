app.controller('HomeCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
  $scope.title = "Home";

  $scope.loggedIn = !!Auth.getAuth();
  //clears the content of the input box if sent back to the login page
  $scope.clearContents = function(element) {
    if(!element.url) { return; }
    element.url.text = '';
  };

}]);
