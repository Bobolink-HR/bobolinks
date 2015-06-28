app.controller('ForumsCtrl', ['$scope', 'ForumsFactory', 'Auth', '$window', '$rootScope', function($scope, ForumsFactory, Auth, $window, $rootScope) {
  $scope.title = "Example Moderator Forums View";
  $scope.active = true;
  $scope.forums = ForumsFactory.getForums();
  $scope.user = Auth.getAuth().uid;

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
    console.log(forum);
    return moment(dateString).fromNow();
  }

  // Determines whether a forum is active or complete
  $scope.completed = function(endDate){
    if (typeof endDate === "string"){
      // convert string to date object
      var endDate = moment(endDate);
      // if negative, date has passed
      return endDate.diff(moment()) < 0 ? true : false;
    }
  };

  // Sets status property of forum to delete on confirmation
  $scope.remove = function(forum){
    $rootScope.showConfirm('Remove this forum?', null, $scope).then(function(res){
      if (res) {
        ForumsFactory.getForum(forum.$id).$bindTo($scope, "forum").then(function(){ 
          $scope.forum.status = 'delete'; 
        });
        hidemodal();
        $rootScope.goBack();
      } else {
        hidemodal();
        $rootScope.goBack();
        return;
      }
    })
  };

  $scope.goToForum = function(forumId){
    $window.location.href = 'http://localhost:8100/#/app/forum/' + forumId;
  };

}]);

/*
endDateExample: "Sun Jan 01 2017 15:00:00 GMT-0800"
*/
