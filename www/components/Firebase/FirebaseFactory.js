//Establishes connection to firebase for use in any other Factory or Controller
app.factory('FirebaseRef', function() {
  console.log("Firebase factory called");
  var ref = new Firebase("https://bobolinks.firebaseio.com");
  return ref;
});
