function ForumsFactory(FirebaseRef, $firebaseArray, $firebaseObject) {

  var forumRef = FirebaseRef.child('Forums');

  var forumArray = $firebaseArray(forumRef);

  //Get a list of Forums
  function getForums() {
    return forumArray;
  }
  //Get a forum
  function getForum(forumID) {
    return $firebaseObject(forumRef.child(forumID));
  }

  //Save a forum
  function saveForum(forum) {
    var testForum = {
      title: 'Forum #1',
      description: 'Description of Forum #1',
      creatorID: 'simplelogin:1',
      private: false,
      createdAt: new Date(),
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
    return forumArray.$add(testForum); // Returns a promise

    console.log("saveForum called");
  }

  return {
    // forumRef: forumRef,
    // forumArray: forumArray,
    // FirebaseRef: FirebaseRef,
    // firebaseArray: $firebaseArray,
    // firebaseObject, $firebaseObject,
    getForums: getForums,
    getForum: getForum,
    saveForum: saveForum
  };
}

app.factory('ForumsFactory', ['FirebaseRef', '$firebaseArray', '$firebaseObject', ForumsFactory]);
