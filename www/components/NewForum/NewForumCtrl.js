app.controller('NewForumCtrl', ['$scope', 'ForumsFactory', function($scope, ForumsFactory) {
  $scope.title = 'Create New Forum';

  $scope.newForum = {};

  $scope.addForum = function(newForum) {
    console.log('newForum: ', newForum)
    $scope.newForum.creatorID = "simplelogin:1"; //Update this to be the actual user ID
    $scope.newForum.createdAt = JSON.stringify(new Date().toString());
    // THIS IS WHERE THE DATES AND TIMES WOULD BE MODIFIED
    // $scope.newForum.date = JSON.stringify(newForum.date.toString());
    // $scope.newForum.start = JSON.stringify(newForum.start);
    // $scope.newForum.end = JSON.stringify(newForum.end);
    console.log('scope.newForum', $scope.newForum);
    ForumsFactory.saveForum(newForum).then(function(ref) {
      var id = ref.key();
      // $scope.forum = ForumsFactory.getForum(id);
      console.log("added a new forum with id " + id);
    }).catch(function(err) {
      console.error(err);
    });
  }
}]);
