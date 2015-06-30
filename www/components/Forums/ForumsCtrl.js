app.controller('ForumsCtrl', function($scope, ForumsFactory, Auth, $rootScope, $state) {
  $scope.active = true;
  $scope.forums = ForumsFactory.getForums();

  $scope.forumTitle = function() {
    return $rootScope.displayName();
  };

  // Toggles between active and complete view
  $scope.switchView = function(boolean){
    $scope.active = boolean;
  };

  // Shows active start/end times relative to current date
  $scope.convertTime = function(dateString){
    return moment(dateString).calendar();
  };

  // Shows time since completed forum
  $scope.timeAgo = function(dateString, forum){
    return moment(dateString).fromNow();
  };

  // Determines whether a forum is active or complete
  $scope.completed = function(endDate){
    if (typeof endDate === "string"){
      // convert string to date object
      endDate = moment(endDate);
      // if negative, date has passed
      return endDate.diff(moment()) < 0 ? true : false;
    }
  };

  // $scope.email = function(forum) {
  //   alert("SEND AN EMAIL");
  // };

  // Sets status property of forum to delete on confirmation
  // BUG WITH CONFIRMATION
  $scope.remove = function(forum){
    // event.stopPropagation();
    $rootScope.showConfirm('Remove this forum?', null, $scope).then(function(res){
      if (res) {
        ForumsFactory.getForum(forum.$id).$bindTo($scope, "forum").then(function(){
          $scope.forum.status = 'delete';
        });
      }
    });
  };
});
