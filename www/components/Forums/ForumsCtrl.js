app.controller('ForumsCtrl', ['$scope', 'ForumsFactory', function($scope, ForumsFactory) {
  $scope.title = "Example Moderator Forums View";
  $scope.active = true;
  $scope.forums = ForumsFactory.getForums();

  $scope.switchView = function(boolean){
    $scope.active = boolean;
    console.log($scope.active);
  };
  
  $scope.completed = function(endDate){
    if (typeof endDate === "string"){
      // convert string to date object
      var endDate = moment(endDate);
      // if negative, date has passed
      return endDate.diff(moment()) < 0 ? true : false;
    }
  }
}]);

/*
endDateExample: "Sun Jan 01 2017 15:00:00 GMT-0800"
*/
