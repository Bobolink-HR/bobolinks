app.controller('HomeCtrl', function($scope, $location, Auth, $ionicSideMenuDelegate) {
  $scope.title = "Home";

  $scope.loggedIn = !!Auth.getAuth();

  // If user is not logged in, hide the side nav bar
  $ionicSideMenuDelegate.canDragContent($scope.loggedIn);

  // Clears the content of the input box if sent back to the login page
  $scope.clearContents = function(element) {
    if(!element.url) { return; }
    element.url.text = '';
  };

});
