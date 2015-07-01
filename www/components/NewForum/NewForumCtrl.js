app.controller('NewForumCtrl', function($scope, ForumsFactory, $rootScope, Auth, forum) {


  // $scope.newKey =

  // $scope.newKey = ForumsFactory.generateForumId();





  // console.log($scope.newKey);

  // $scope.newKey.$loaded(function(data) {
  //   // $scope.newKey = $$state.value
  //   console.log(data);
  // })


  // console.log($scope.newKey);


  $scope.title = 'Create New Forum';
  $scope.isNewForum = true;

  if(forum) {
    $scope.isNewForum = false;
    $scope.title = forum.title;
    $scope.newForum = forum;

    var setStartTime = moment(forum.startsAt).toDate();
    var setEndTime = moment(forum.endsAt).toDate();
    $scope.newForum.startsAt = setStartTime;
    //$scope.newForum.startDate = moment($scope.newForum.startsAt).toDate();
    $scope.newForum.endsAt = setEndTime;

    var setStartDate = moment(forum.startsAt).toDate();
    var setEndDate = moment(forum.endsAt).toDate();
    $scope.newForum.startDate = setStartDate;
    $scope.newForum.endDate = setEndDate;
  }

  else {
    $scope.newForum = {};
  }




  // By default set end date to same as start date
  $scope.defaultEndDate = function() {
    $scope.newForum.endDate = $scope.newForum.startDate;
  };

  $scope.addForum = function(newForum) {
    $scope.newForum.creatorID = Auth.getAuth().uid; //Update this to be the actual user ID
    $scope.newForum.createdAt = JSON.stringify(new Date().toString());

    // Convert start to the user input date and time as a string
    $scope.newForum.startsAt = newForum.startDate.toString().slice(0,16).concat( newForum.startsAt.toString().slice(16,33) );
    delete $scope.newForum.startDate;

    // Convert end to the user input date and time as a string
    $scope.newForum.endsAt = newForum.endDate.toString().slice(0,16).concat( newForum.endsAt.toString().slice(16,33) );
    delete $scope.newForum.endDate;

    console.log($scope.newForum);
    // Save the forum to Firebase
    ForumsFactory.saveForum($scope.newForum).then(function(ref) {
      var id = ref.key();
      console.log("Saved forum");
    }, function(err) {
      console.log("Error saving: ", err);
    });
  };

  $scope.editForum = function(newForum) {
    $scope.newForum.creatorID = Auth.getAuth().uid; //Update this to be the actual user ID
    $scope.newForum.createdAt = JSON.stringify(new Date().toString());

    // Convert start to the user input date and time as a string
    $scope.newForum.startsAt = newForum.startDate.toString().slice(0,16).concat( newForum.startsAt.toString().slice(16,33) );
    delete $scope.newForum.startDate;

    // Convert end to the user input date and time as a string
    $scope.newForum.endsAt = newForum.endDate.toString().slice(0,16).concat( newForum.endsAt.toString().slice(16,33) );
    delete $scope.newForum.endDate;

    console.log($scope.newForum);
    // Save the forum to Firebase
    ForumsFactory.editForum($scope.newForum).then(function(ref) {
      // var id = ref.key();
      // console.log("edited forum with id " + id);
      $scope.resetForm();
      $rootScope.goBack();
    }).catch(function(err) {
      console.error(err);
    });
  };

  // Clear forum input, cannot access forumForm here
  $scope.resetForm = function() {
    $scope.newForum = {};
    // $scope.forumForm.$setPristine();
  };

});
