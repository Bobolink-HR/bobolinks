app.controller('LandingCtrl', ["$scope", "$firebaseObject", 'FirebaseRef', 'ForumsFactory', function($scope, $firebaseObject, FirebaseRef, ForumsFactory) {

  console.log("ForumsFactory:", ForumsFactory);

  //firebaseRef is the returned firebase reference from our Firebase factory
  console.log("FIrebaseREf:", FirebaseRef);
  //fireBase Object function to convert a firebase reference to into a synchronized object
  console.log("FirebaseOBejct:", $firebaseObject);

  console.log("ForumsFactory:", ForumsFactory);

  $scope.title = "Landing";
  //Shows the root data returned from Firebase, for understanding
  $scope.firebaseRefDataIllustration = $firebaseObject(FirebaseRef);





  var whichUser = "John";
  $scope.john = $firebaseObject(FirebaseRef.child('Users').child(whichUser));
  //
  var usersRef = FirebaseRef.child('Users');
  $scope.john = $firebaseObject(usersRef.child(whichUser));

  $scope.users = $firebaseObject(usersRef);


  $scope.forum = ForumsFactory.getForum('-JsU1bUBXtUh8a9tMbV4');


  $scope.forums = ForumsFactory.getForums();


  ForumsFactory.saveForum('asdf').then(function(ref) {
    var id = ref.key();
    console.log("added record successfully called with id " + id);
  }).catch(function(err) {
    console.error(err);
  });;

}]);
