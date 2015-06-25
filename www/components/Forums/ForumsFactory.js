function ForumsFactory(FirebaseRef, $firebaseArray, $firebaseObject) {

  var forumRef = FirebaseRef.child('Forums');
  var forumArray = $firebaseArray(forumRef);

  //Get a list of Forums
  function getForums() {
    return forumArray; // Returns a $firebaseArray collection of all forums
  }

  //Get a forum
  function getForum(forumId) { // Pass a string representing the forumID
    return $firebaseObject(forumRef.child(forumId)); // Returns a $firebaseObject of all items
  }

  function getQuestions(forumId, status) {
    return $firebaseArray(forumRef.child(forumId + '/questions/' + status));
  }

  //Save a forum
  function saveForum(forum) { // Pass this the forum object to be saved to the database
    return forumArray.$add(forum); // Returns a promise
  }

  //Add a question
  function addQuestion(forumID, question) { // Pass the forum ID and the question to add to it
    var questionRef = forumRef.child(forumID).child('questions/pending');
    var questionArray = $firebaseArray(questionRef); // Creates a question reference
    return questionArray.$add(question); // Returns a promise when the question is added
  }

  //TODO: Edit a question

  return {
    getForums: getForums,
    getForum: getForum,
    saveForum: saveForum,
    getQuestions: getQuestions,
    addQuestion: addQuestion
  };
}

app.factory('ForumsFactory', ['FirebaseRef', '$firebaseArray', '$firebaseObject', ForumsFactory]);
