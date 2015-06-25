/****
This is just representing test data currently to illustrate how to use ForumsFactory
*****/
app.controller('LandingCtrl', ["$scope", "$firebaseObject", 'FirebaseRef', 'ForumsFactory', function($scope, $firebaseObject, FirebaseRef, ForumsFactory) {

  console.log("ForumsFactory:", ForumsFactory);

  //firebaseRef is the returned firebase reference from our Firebase factory
  console.log("FirebaseRef:", FirebaseRef);
  //fireBase Object function to convert a firebase reference to into a synchronized object
  console.log("FirebaseObject:", $firebaseObject);

  console.log("ForumsFactory:", ForumsFactory);

  $scope.title = "Landing";
  //Shows the root data returned from Firebase, for understanding
  $scope.firebaseRefDataIllustration = $firebaseObject(FirebaseRef);

  $scope.newForum = {};

  $scope.addForum = function(newForum) {
    $scope.newForum.creatorID = "simplelogin:1"; //Update this to be the actual user ID
    $scope.newForum.createdAt = JSON.stringify(new Date().toString());

    ForumsFactory.saveForum(newForum).then(function(ref) {
      var id = ref.key();
      $scope.forum = ForumsFactory.getForum(id);
      console.log("added a new forum with id " + id);
    }).catch(function(err) {
      console.error(err);
    });
  }

  var whichUser = "John";
  $scope.john = $firebaseObject(FirebaseRef.child('Users').child(whichUser));

  var usersRef = FirebaseRef.child('Users');
  $scope.john = $firebaseObject(usersRef.child(whichUser));

  $scope.users = $firebaseObject(usersRef);

  $scope.forums = ForumsFactory.getForums();

  var testForum = {
    title: 'Forum #1',
    description: 'Description of Forum #1',
    creatorID: 'simplelogin:1',
    private: false,
    createdAt: JSON.stringify(new Date().toString()),
    questions: {
      question1: {
        text: "Why do my feet hurt?",
        ranking: 2,
        userID: 'simplelogin: 1'
      },
      question2: {
        text: "Why do penguins wear tuxedos?",
        ranking: -2,
        userID: 'simplelogin: 2'
      }
    }
  };

  ForumsFactory.saveForum(testForum).then(function(ref) {
    var id = ref.key();
    $scope.forum = ForumsFactory.getForum(id);
    console.log("added record successfully called with id " + id);
  }).catch(function(err) {
    console.error(err);
  });

}]);
