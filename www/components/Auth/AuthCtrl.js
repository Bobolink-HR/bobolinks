app.controller('AuthCtrl', ['$scope', '$location', '$window', function($scope, $location, $window) {
  $scope.title = "Login";

  //redirects the user to the specified url
  $scope.moveUrl = function(url) {
    $window.location.href = 'http://localhost:8100/#/app' + url;
  }

  //clears the content of the input box if sent back to the login page
  $scope.clearContents = function(element) {
    if(!element.url) { return; }
    element.url.text = '';
  }
  
}]);
