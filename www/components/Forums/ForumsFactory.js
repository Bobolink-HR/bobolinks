function ForumsFactory(FirebaseRef, $firebaseArray, $firebaseObject) {

  var forumRef = FirebaseRef.child('Forums');
  var forumArray = $firebaseArray(forumRef);

  //Get a list of Forums
  function getForums() {
    return forumArray; // Returns a $firebaseArray collection of all forums
  }

  //Get a forum
  function getForum(forumID) { // Pass a string representing the forumID
    return $firebaseObject(forumRef.child(forumID)); // Returns a $firebaseObject of all items
  }

  //Save a forum
  function saveForum(forum) { // Pass this the forum object to be saved to the database
    return forumArray.$add(forum); // Returns a promise
  }

  //Remove a forum
  function removeForum(forumID) {

  }

  return {
    getForums: getForums,
    getForum: getForum,
    saveForum: saveForum,
    removeForum: removeForum
  };
}

app.factory('ForumsFactory', ['FirebaseRef', '$firebaseArray', '$firebaseObject', ForumsFactory]);
