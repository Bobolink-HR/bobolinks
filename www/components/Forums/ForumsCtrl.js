app.controller('ForumsCtrl', ['$scope', function($scope) {
  $scope.title = "Example Moderator Forums View";
  $scope.forums = [
    { active: true, title: 'How to Pick Not-Poisonous Mushrooms', description: 'Bring your hogs', date: 'now' },
    { active: false, title: 'From Pauper to Princess in 10 Days', description: 'Everything you need to know to be the princess you always knew you could be', date: 'tomorrow' },
    { active: false, title: 'Find Your Real You That\'s Really You', description: 'Look inwardly to find your inward self', date: 'Mondays @ 6' },
    { active: false, title: 'School For Kids Who Want To Reed Good', description: 'And do other things real good two. Join us for an exploration into educating our future.', date: '3 days ago' }
  ];
}]);