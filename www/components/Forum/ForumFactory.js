function ForumFactory(FirebaseRef, $firebaseArray, $firebaseObject) {

  var forumRef = FirebaseRef.child('Forums');
  var questionRef = FirebaseRef.child('Questions');
  var forumArray = $firebaseArray(forumRef);
  var questionArray = $firebaseArray(questionRef);

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

  function getQuestions(forumID) { // Pass a string representing the forumID
    
  }

  return {
    getForums: getForums,
    getForum: getForum,
    saveForum: saveForum
  };
}

app.factory('ForumsFactory', ['FirebaseRef', '$firebaseArray', '$firebaseObject', ForumsFactory]);
