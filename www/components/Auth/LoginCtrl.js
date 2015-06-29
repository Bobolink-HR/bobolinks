app.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, Auth, $window, $ionicHistory, $ionicSideMenuDelegate) {

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
  
  Auth.requireAuth().then(function() {
    $state.go('app.forums');
  });

  $scope.createUser = function (user) {
    console.log("Create User Function called");
    if (user && user.email && user.password && user.displayname) {
      $ionicLoading.show({
        template: 'Signing Up...'
      });

      auth.$createUser({
        email: user.email,
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
  }

  $scope.signIn = function (user) {
    if (user && user.email && user.pwdForLogin) {
      $rootScope.show('Signing In...')
      Auth.auth.$authWithPassword({
        email: user.email,
        password: user.pwdForLogin
      }).then(function (authData) {
        console.log("Logged in as:" + authData.uid);
        $rootScope.hide();
        $window.location.replace('/#/app/forums');
      }).catch(function (error) {
        $rootScope.showAlert("Authentication failed", error.message);
        $rootScope.hide();
      });
    } else {
      alert("Please enter email and password both");
    }
  }
})
