function AuthFactory(FirebaseRef, $firebaseAuth, $firebaseObject) {

  var auth = $firebaseAuth(FirebaseRef);

  function getUserProfile(userID) {
    console.log("getUserProfile for userID:", userID);
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

  function requireAuth() {
    return auth.$requireAuth();
  }

  function getAuth() {
    return auth.$getAuth();
  }

  function logout() {
    return auth.$unauth();
  }

  return {
    auth: auth,
    getUserProfile: getUserProfile,
    setUserProfile: setUserProfile,
    setUserData: setUserData,
    waitForAuth: waitForAuth,
    requireAuth: requireAuth,
    getAuth: getAuth,
    logout: logout
  };

}

app.factory("Auth", ["FirebaseRef", "$firebaseAuth", "$firebaseObject", AuthFactory]);
