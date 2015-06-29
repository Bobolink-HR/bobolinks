app.directive('forumView', function() {
  return {
    restrict: 'E',
    scope: {
      forum: '=',
      start: '=',
      end: '='
    },
    templateUrl: 'components/Forums/forumView.html'
  };
});
