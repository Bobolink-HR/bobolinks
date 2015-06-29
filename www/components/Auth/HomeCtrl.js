app.controller('HomeCtrl', ['$scope', '$location', '$window', 'Auth', function($scope, $location, $window, Auth) {
  $scope.title = "Home";

  $scope.loggedIn = !!Auth.getAuth();

  //redirects the user to the specified url
  $scope.moveUrl = function(forumCode) {
    $window.location.href = 'http://localhost:8100/#/app/forum/' + forumCode;
  };

  //clears the content of the input box if sent back to the login page
  $scope.clearContents = function(element) {
    if(!element.url) { return; }
    element.url.text = '';
  };

}]);
