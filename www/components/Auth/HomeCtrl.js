app.controller('HomeCtrl', function($state, $rootScope, $scope, $location, Auth, $ionicSideMenuDelegate) {
  $scope.title = "Home";

  $scope.loggedIn = !!Auth.getAuth();

  // If user is not logged in, hide the side nav bar
  $ionicSideMenuDelegate.canDragContent($scope.loggedIn);

  $scope.joinForum = function(forumKey) {
    if (!Auth.getAuth()) {
      Auth.getGitHubAuth(function(authData) {
        $scope.title = forumKey;
        $state.go('app.forum', {forumKey: forumKey});
      });;
    }
    console.log("Going to ")
    $state.go('app.forum', {forumKey: forumKey});
  };

  $scope.gitHubLogin = function(){
    Auth.getGitHubAuth();
  };

});
