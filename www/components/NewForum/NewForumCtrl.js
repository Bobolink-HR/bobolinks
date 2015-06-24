// var moment = require('moment');
app.controller('NewForumCtrl', ['$scope', 'ForumsFactory', function($scope, ForumsFactory) {
  $scope.title = 'Create New Forum';

  $scope.newForum = {};

  $scope.addForum = function(newForum) {
    console.log('BEFORE newForum: ', newForum)
    $scope.newForum.creatorID = "simplelogin:1"; //Update this to be the actual user ID
    $scope.newForum.createdAt = JSON.stringify(new Date().toString());
    $scope.newForum.start = moment(newForum.startDate).toString().slice(0,16).concat( newForum.start.toString().slice(16,34) );
    delete $scope.newForum.startDate;
    $scope.newForum.end = moment(newForum.endDate).toString().slice(0,16).concat( newForum.end.toString().slice(16,34) );
    delete $scope.newForum.endDate;
    console.log('AFTER newForum: ', newForum);
    ForumsFactory.saveForum(newForum).then(function(ref) {
      var id = ref.key();
      // $scope.forum = ForumsFactory.getForum(id);
      console.log("added a new forum with id " + id);
    }).catch(function(err) {
      console.error(err);
    });
  }
}]);
