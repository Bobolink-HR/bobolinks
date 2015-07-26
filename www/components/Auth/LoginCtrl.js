app.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, Auth, $ionicHistory, $ionicSideMenuDelegate) {
  // Hide side bar from user because user must not be logged in
  $ionicSideMenuDelegate.canDragContent(false);

  $ionicHistory.nextViewOptions({
    disableAnimate: false,
    disableBack: true
  }); //This disables the back button after signing in

  var ref = new Firebase("https://bobolinks.firebaseio.com/");
  var auth = $firebaseAuth(ref);

  $ionicModal.fromTemplateUrl('components/auth/register.html', {
      scope: $scope
  }).then(function (modal) {
      $scope.modal = modal;
  });

  // If user is logged in already, redirect them to app.forums
  Auth.requireAuth().then(function() {
    $state.go('app.forums');
  });

  // Create user
  $scope.createUser = function (user) {
    if (user && user.email && user.password && user.displayname) {
      $ionicLoading.show({
        template: 'Signing Up...'
      });

      auth.$createUser({
        email: user.email.toLowerCase(),
        password: user.password
      }).then(function (userData) {
        alert("User created successfully!");
        ref.child("Profiles").child(userData.uid).set({
          email: user.email,
          displayName: user.displayname
        });
        $ionicLoading.hide();
        $scope.modal.hide();
      }).catch(function (error) {
        alert(error);
        $ionicLoading.hide();
      });
    } else {
      alert("Please fill all details");
    }
  };

  // Sign in user with email and password
  $scope.signIn = function (user) {
    if (user && user.email && user.pwdForLogin) {
      $rootScope.show('Signing In...');
      Auth.auth.$authWithPassword({
        email: user.email,
        password: user.pwdForLogin
      }).then(function (authData) {
        $ionicSideMenuDelegate.canDragContent(true);
        $rootScope.hide();
        $state.go('app.forums');
      }).catch(function (error) {
        $rootScope.showAlert("Authentication failed", error.message);
        $rootScope.hide();
      });
    } else {
      alert("Please enter email and password both");
    }
  };
});
