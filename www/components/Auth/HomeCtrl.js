app.controller('HomeCtrl', function($scope, $location, Auth, $ionicSideMenuDelegate) {
  $scope.title = "Home";

  $scope.loggedIn = !!Auth.getAuth();

  // If user is not logged in, hide the side nav bar
  $ionicSideMenuDelegate.canDragContent($scope.loggedIn);

  $scope.gitHubLogin = function(){
    Auth.getGitHubAuth();
  };

});
