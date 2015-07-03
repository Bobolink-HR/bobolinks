function AuthFactory(FirebaseRef, $state, $firebaseAuth, $firebaseObject) {

  // Establishes auth connection with firebase
  var auth = $firebaseAuth(FirebaseRef);
  var ref = FirebaseRef;


  // Returns a promise of a firebase object with the user id provided
  // If the user doesn't exist, this still returns an object but the email and password will be undefined
  function getUserProfile(userID) {
    var profileRef = FirebaseRef.child('Profiles').child(userID);
    return $firebaseObject(profileRef);
  }

  function setUserProfile(userID, profile) {
    FirebaseRef.child('Profiles').child(userID).set(profile);
  }


  function setUserData(userID, profile) {
    FirebaseRef.child('Users').child(userID).set(profile);
  }

  function waitForAuth() {
    return auth.$waitForAuth;
  }

  // Used in resolves in app.js, this function will reroute to the home page if user is not logged in
  function requireAuth() {
    return auth.$requireAuth();
  }

  // Returns true if there is currently an authorized user
  function getAuth() {
    return auth.$getAuth();
  }

  // Logs out user
  function logout() {
    return auth.$unauth();
  }

  function getGitHubAuth(){
    auth.$authWithOAuthPopup("github").then(function(authData) {
      $state.go($state.current, {}, {reload: true});
    }).catch(function(err) {
      console.log("Not authenticated with ", err);
    });
  }

  function getGitHubProfile(userID){
    var profileRef = FirebaseRef.child('Users').child(userID);
    return $firebaseObject(profileRef);
  }

    return {
    auth: auth,
    ref: ref,
    getUserProfile: getUserProfile,
    setUserProfile: setUserProfile,
    setUserData: setUserData,
    waitForAuth: waitForAuth,
    requireAuth: requireAuth,
    getAuth: getAuth,
    logout: logout,
    getGitHubAuth: getGitHubAuth
  };

}

app.factory("Auth", ["FirebaseRef", "$state", "$firebaseAuth", "$firebaseObject", AuthFactory]);
