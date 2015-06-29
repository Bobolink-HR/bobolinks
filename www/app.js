var app = angular.module('starter', ['ionic', 'firebase'])

/////////////////////////////////////////////////////////////////////////////
//    APP INITIALIZATION
/////////////////////////////////////////////////////////////////////////////
.run(function($ionicPlatform, $rootScope, $firebase, $window, Auth, $ionicPopup, $ionicViewService, $ionicLoading, $state) {
  $ionicPlatform.ready(function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  rootScopeInit($rootScope, $ionicPopup, $ionicViewService, $ionicLoading, $window, Auth, $state);
})

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
    views: {
      'menuContent': {
        templateUrl: "components/Forum/forum.html",
        controller: 'ForumCtrl'
      }
    },
    resolve: {
      forumData: function($stateParams, $location, ForumsFactory) {
        // Pull forum from Firebase database
        console.log("stateParams:", $stateParams);
        var forum = ForumsFactory.getForum($stateParams.forumKey);

        forum.$loaded(function() {
          // If forum title is undefined (aka forum doesn't exist), redirect to home
          if (forum.title === undefined) {
            $location.path('/home');
          }
        });
      },
      simpleObj:  function(){
        return {value: 'simple!'};
      }
    }
  })
  .state('app.forums', {
    url: "/forums",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.requireAuth();
      }]
    },
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
      }]
    },
    views: {
      'menuContent': {
        templateUrl: "components/NewForum/new-forum.html",
        controller: 'NewForumCtrl'
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
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

var rootScopeInit = function($rootScope, $ionicPopup, $ionicViewService, $ionicLoading, $window, Auth, $state) {
  //console.log("rootScopeInit called!");

  ///////////////////////////////////////////////////////
  // Event Listeners
  ///////////////////////////////////////////////////////

  Auth.auth.$onAuth(function(authData) {
      if (authData) {
        //**  LOGGED IN SUCCESFFULLY
        console.log("Logged in via $onAuth function in $rootScope.");

        $rootScope.user = Auth.getAuth(); //Sets User object in rootScope
        var lastLogin = moment().format();

        authData.lastLogin = lastLogin;

        $rootScope.profile = Auth.getUserProfile(authData.uid);
        $rootScope.user = authData;

        Auth.setUserData(authData.uid, authData);

      } else {
        //** LOGGED OUT
        //will not redirect user from home to login
        if(window.location.hash === '#/app/home') {
          $window.location.replace('/#/app/home');
        } else {
          $window.location.replace('/#/app/login');
        }
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
            console.log($scope.data);
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
      //content: text ? text : 'Loading..',
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
    console.log("$rootScope.notifiy() called");
    $rootScope.show(text);
    window.setTimeout(function() {
      $rootScope.hide();
    }.bind(this), time);
  };

  $rootScope.displayName = function() {
    if(!$rootScope.profile) {
      return '';
    } else {
      return $rootScope.profile.displayName;
    }
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
