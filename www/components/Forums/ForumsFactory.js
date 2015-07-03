function ForumsFactory(FirebaseRef, $firebaseArray, $firebaseObject, $rootScope, $q) {

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

  function pollAvailable(forumID) {
    var deferred = $q.defer();
    var polls = $firebaseArray(forumRef.child(forumID + '/polls'));
    polls.$loaded(function(data) {
      if(polls.length < 1) {
        console.log('no poll available')
          deferred.resolve(false);
        return;
      }
      console.log('poll available')
        deferred.resolve(true);
      return;
    });
    return deferred.promise;
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
    var pollRef = forumRef.child(forumID).child('polls');
    var pollArray = $firebaseArray(pollRef);
    poll.option1Responses = 0;
    poll.option2Responses = 0;
    poll.option3Responses = 0;
    poll.option4Responses = 0;
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

  //Add a response to a poll's responses array
  function addResponse(response, forumID) {
    var polls = $firebaseArray(forumRef.child(forumID + '/polls'));
    var optionString = 'option' + response.value + 'Responses';
    polls.$loaded(function(data) {
      polls[0][optionString]++;
      polls[0].responses = polls[0].responses || [];
      polls[0].responses.push(response);
      polls.$save(0);
    })
  }

  //Returns true if the current user has already responded to the poll
  function awaitingResponse(username, forumID) {
    var polls = $firebaseArray(forumRef.child(forumID + '/polls'));
    polls.$loaded(function(responses) {
      if(polls.length < 1) {
      $rootScope.awaitingResponse = false;
        return false;
      }
      if (!polls[0].responses) {
      $rootScope.awaitingResponse = true;
        return true;
      }
      for (var i = 0; i < polls[0].responses.length; i++) {
        if (polls[0].responses[i].username === username) {
      $rootScope.awaitingResponse = false;
          return false;
        }
      }
      $rootScope.awaitingResponse = true;
      return true;
    });
  }

  //End current poll
  function endPoll(forumID) {
    var pollRef = forumRef.child(forumID).child('polls');
    var pollArray = $firebaseArray(pollRef);
    pollArray.$loaded(function(data) {
      if(pollArray.length > 0) {
        pollArray.$remove(0);
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
    addResponse: addResponse,
    awaitingResponse: awaitingResponse,
    endPoll: endPoll,
    pollAvailable: pollAvailable,
    markComplete: markComplete
    // ,generateForumId: generateForumId
  };
}

app.factory('ForumsFactory', ['FirebaseRef', '$firebaseArray', '$firebaseObject', '$rootScope', '$q', ForumsFactory]);
