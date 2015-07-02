function ForumsFactory(FirebaseRef, $firebaseArray, $firebaseObject) {

  var forumRef = FirebaseRef.child('Forums');
  var forumArray = $firebaseArray(forumRef);
  var forumObject = $firebaseObject(forumRef);

  //Get a list of Forums
  function getForums() {
    return forumArray; // Returns a $firebaseArray collection of all forums
  }

  //Get a forum
  function getForum(forumID) { // Pass a string representing the forumID
    return $firebaseObject(forumRef.child(forumID)); // Returns a $firebaseObject of all items
  }

  function getQuestions(forumID, status) {
    return $firebaseArray(forumRef.child(forumID + '/questions/' + status));
  }

  function getPolls(forumID) {
    return $firebaseArray(forumRef.child(forumID + '/polls/'));
  }

  // function generateForumId() {
  //   var text = "";
  //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //
  //   for (var i=0; i < 5; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   var forum = getForum(text);
  //
  //   return forum.$loaded(function() {
  //     if (forum.title === undefined) {
  //       return text;
  //     } else {
  //       return generateForumId();
  //     }
  //   });
  // }


  //Save a forum
  function saveForum(forum) { // Pass this the forum object to be saved to the database
    var forumObj = {};
    forumObject[forum.forumKey] = forum;
    return forumObject.$save();
  }

  function editForum(forum) { // Pass this the forum object to be saved to the database
    return forum.$save();
    //return forumArray.$save(forum); // Returns a promise
  }

  function markComplete(forum) {
    console.dir(forum);
    forum.status='delete';
    forumArray.$save(forum);
  }

  //Add a question
  function addQuestion(forumID, question) { // Pass the forum ID and the question to add to it
    var questionRef = forumRef.child(forumID).child('questions/pending');
    var questionArray = $firebaseArray(questionRef); // Creates a question reference
    return questionArray.$add(question); // Returns a promise when the question is added
  }

  //Add a poll
  function addPoll(forumID, poll) {
    console.log('inside addPoll in forumsFactory');
    var pollRef = forumRef.child(forumID).child('polls');
    var pollArray = $firebaseArray(pollRef);
    pollArray.$loaded(function(data) {
      if(pollArray.length > 0) {
        pollArray.$remove(0)
          .then(function(){
            pollArray.$add(poll);
          });
      } else {
        pollArray.$add(poll);
      }
    })
  }


  //TODO: Edit a question

  return {
    getForums: getForums,
    getForum: getForum,
    saveForum: saveForum,
    editForum: editForum,
    getQuestions: getQuestions,
    addQuestion: addQuestion,
    getPolls: getPolls,
    addPoll: addPoll,
    markComplete: markComplete
    // ,generateForumId: generateForumId
  };
}

app.factory('ForumsFactory', ['FirebaseRef', '$firebaseArray', '$firebaseObject', ForumsFactory]);
