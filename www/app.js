var app = angular.module('starter', ['ionic', 'firebase'])


/////////////////////////////////////////////////////////////////////////////
//    APP INITIALIZATION
/////////////////////////////////////////////////////////////////////////////
.run(function($ionicPlatform, $rootScope, $firebase, Auth, $ionicPopup, $ionicViewService, $ionicLoading, $state) {
  $ionicPlatform.ready(function(){
  });

  rootScopeInit($rootScope, $ionicPopup, $ionicViewService, $ionicLoading, Auth, $state);
})
.config(['$compileProvider', function($compileProvider) {
  // Set $compileProvider so that angular doesn't mark data:image links as unsafe
  // and we can download our drawing.
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
}])
/////////////////////////////////////////////////////////////////////////////
//    ROUTING
/////////////////////////////////////////////////////////////////////////////
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent' : {
        templateUrl: "components/Auth/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.login', {
    url:"/login",
    views: {
      'menuContent': {
        templateUrl: "components/Auth/login.html",
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.forum', {
    url: "/forum/:forumKey",
    data: {
      requireLogin: true
    },
    views: {
      'menuContent': {
        templateUrl: "components/Forum/forum.html",
        controller: 'ForumCtrl'
      }
    },
    resolve: {
      forumKey: ['$stateParams', '$state', 'ForumsFactory', function($stateParams, $state, ForumsFactory) {
        var forum = ForumsFactory.getForum($stateParams.forumKey);

        forum.$loaded(function() {
          if (forum.title === undefined) {
            $state.go('app.home');
            return $stateParams.forumKey;
          }
        });
      }]
    }
  })
  .state('app.forums', {
    url: "/forums",
    resolve: {},
    views: {
      'menuContent': {
        templateUrl: "components/Forums/forums.html",
        controller: 'ForumsCtrl'
      }
    }
  })

  .state('app.new-forum', {
    url: "/new-forum",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.requireAuth();
      }],
      forum: function() { return undefined; }
    },
    views: {
      'menuContent': {
        templateUrl: "components/NewForum/new-forum.html",
        controller: 'NewForumCtrl'
      }
    }
  })

  .state('app.edit-forum', {
    url: "/edit-forum/:forumKey",
    views: {
      'menuContent': {
        templateUrl: "components/NewForum/new-forum.html",
        controller: 'NewForumCtrl'
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.requireAuth();
      }],
      forum: function($stateParams, $state, ForumsFactory) {
        // Pull forum from Firebase database
        var forum = ForumsFactory.getForum($stateParams.forumKey);

        forum.$loaded(function() {
          // If forum title is undefined (aka forum doesn't exist), redirect to home
          if (forum.title === undefined) {
            $state.go('app.home');
          }
        });

        return forum;
      }
    }
  })
  .state('app.newQuestion', {
    url: "/new_question?forumKey?forum",
    views: {
      'menuContent': {
        templateUrl: "components/NewQuestion/newQuestion.html",
        controller: 'NewQuestionCtrl'
      }
    }
  })

  .state('app.newPoll', {
    url: "/new_poll?forumKey?forum",
    views: {
      'menuContent': {
        templateUrl: "components/NewPoll/newPoll.html",
        controller: 'NewPollCtrl'
      }
    }
  })
  .state('app.respondToPoll', {
    url: "/respondToPoll?forumKey?forum",
    views: {
      'menuContent': {
        templateUrl: "components/RespondToPoll/respondToPoll.html",
        controller: 'RespondToPollCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

var rootScopeInit = function($rootScope, $ionicPopup, $ionicViewService, $ionicLoading, Auth, $state) {

  ///////////////////////////////////////////////////////
  // Event Listeners
  ///////////////////////////////////////////////////////

  Auth.ref.onAuth(function(authData) {
      if (authData) {
        //**  LOGGED IN SUCCESFFULLY
        $rootScope.user = authData; //Sets User object in rootScope
        $rootScope.lastLogin = moment().format();
        $rootScope.profile = Auth.getUserProfile(authData.uid);

      } else {
        //** LOGGED OUT
        //will not redirect user from home to login
        $rootScope.user = null;
      }
    });

  // Restrict forum view to people logged in.
  $rootScope.$on('$stateChangeStart', function(e, to) {
    if (to.data && to.data.requireLogin && !Auth.getAuth()) {
      e.preventDefault();
      $state.go('app.home');
    }
  });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      $state.go('app.login');
    }
  });

  ///////////////////////////////////////////////////////
  // Modal Window Functionality
  ///////////////////////////////////////////////////////

  $rootScope.showAlert = function(title, template, $scope) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: template,
      scope: $scope
    });
    return alertPopup;
  };

  $rootScope.showPopup = function($scope, template, title, subtitle) {
    return $ionicPopup.show({
      scope: $scope,
      template: template,
      title: title,
      subTitle: subtitle,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data) {
              e.preventDefault();
            } else {
              return $scope.data;
            }
          }
        }
      ]
    });
  };

  $rootScope.showConfirm = function(title, template, $scope) {
    var confirmPopup = $ionicPopup.confirm({
      title: title,
      template: template,
      scope: $scope
    });
    return confirmPopup;
  };

  $rootScope.show = function(text) {
    $rootScope.loading = $ionicLoading.show({
      template: text ? text : 'Loading..',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  };

  $rootScope.hide = function() {
    $ionicLoading.hide();
  };

  $rootScope.notify = function(text, time) {
    time = time || 2000;
    $rootScope.show(text);
    window.setTimeout(function() {
      $rootScope.hide();
    }.bind(this), time);
  };

  $rootScope.displayName = function() {
    if (!$rootScope.user || !$rootScope.user.github || !$rootScope.user.github.displayName) {
      return '';
    }
    return $rootScope.user.github.displayName;
  };

  $rootScope.userID = function() {
    if(!$rootScope.user) {
      return null;
    } else {
      return $rootScope.user.uid;
    }
  };

  ///////////////////////////////////////////////////////
  // Navigation helpers
  ///////////////////////////////////////////////////////

  $rootScope.goBack = function (location) { //goBack function takes an optional location argument, otherwise default is app.forums
    var backView = $ionicViewService.getBackView();
    if (backView) {
      backView.go();
    } else {
      $state.go(location || 'app.forums', {
        reload: false, inherit: false, notify: false
      });
    }
  };

};
