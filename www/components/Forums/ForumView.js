app.directive('forumView', function() {
  return {
    restrict: 'E',
    scope: {
      forum: '=',
      start: '=',
      end: '=',
      remove: '=',
      edit: '=',
      sendEmail: '='
    },
    templateUrl: 'components/Forums/forumView.html'
  };
});
