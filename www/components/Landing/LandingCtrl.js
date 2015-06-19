app.controller('LandingCtrl', ["$scope", "$firebaseObject", 'FirebaseRef', function($scope, $firebaseObject, FirebaseRef) {

  //firebaseRef is the returned firebase reference from our Firebase factory
  console.log("FIrebaseREf:", FirebaseRef);
  //fireBase Object function to convert a firebase reference to into a synchronized object
  console.log("FirebaseOBejct:", $firebaseObject);

  $scope.title = "Landing";
  //Shows the root data returned from Firebase, for understanding
  $scope.firebaseRefDataIllustration = $firebaseObject(FirebaseRef);





  var whichUser = "John";
  $scope.john = $firebaseObject(FirebaseRef.child('Users').child(whichUser));
  //
  var usersRef = FirebaseRef.child('Users');
  $scope.john = $firebaseObject(usersRef.child(whichUser));

  $scope.users = $firebaseObject(usersRef);

}]);
