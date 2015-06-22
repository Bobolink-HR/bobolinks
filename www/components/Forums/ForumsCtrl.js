app.controller('ForumsCtrl', ['$scope', function($scope) {
  $scope.title = "Example Moderator Forums View";
  $scope.forums = [
    { title: 'How to Pick Not-Poisonous Mushrooms', date: 'now' },
    { title: 'From Pauper to Princess in 10 Days', date: 'tomorrow' },
    { title: 'Find Your Real You That\'s Really You', date: 'Mondays @ 6' },
    { title: 'School For Kids Who Want To Reed Good', date: '3 days ago' }
  ];

}]);