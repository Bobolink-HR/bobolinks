app.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, Auth, $window, $ionicHistory) {
    //console.log('Login Controller Initialized');

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
        } else
            alert("Please fill all details");
    }

    $scope.signIn = function (user) {

        if (user && user.email && user.pwdForLogin) {
            // $ionicLoading.show({
            //     template: 'Signing In...'
            // });
            $rootScope.show('Signing In...')
            Auth.auth.$authWithPassword({
                email: user.email,
                password: user.pwdForLogin
            }).then(function (authData) {
                console.log("Logged in as:" + authData.uid);
                // ref.child("Profiles").child(authData.uid).once('value', function (snapshot) {
                //     var val = snapshot.val();
                //     // To Update AngularJS $scope either use $apply or $timeout
                //     $scope.$apply(function () {
                //         $rootScope.displayName = val;
                //     });
                // });
                // $ionicLoading.hide();
                $rootScope.hide();
                // $state.go('app.landing'); // Changed this to $window.location.replace to remove back button
                $window.location.replace('/#/app/forums');
            }).catch(function (error) {
                $rootScope.showAlert("Authentication failed", error.message);
                //alert("Authentication failed:" + error.message);
                $rootScope.hide();
                //$ionicLoading.hide();
            });
        } else
            alert("Please enter email and password both");
    }
})
