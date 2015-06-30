app.directive('forumView', function() {
  return {
    restrict: 'E',
    scope: {
      forum: '=',
      start: '=',
      end: '=',
      remove: '=',
      edit: '=',
      email: '='
    },
    templateUrl: 'components/Forums/forumView.html'
  };
});
