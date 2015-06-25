var app = angular.module('starter', ['ionic', 'firebase'])

/////////////////////////////////////////////////////////////////////////////
//    APP INITIALIZATION
/////////////////////////////////////////////////////////////////////////////
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

  //TODO: Add any init code here
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
  .state('app.landing', {
    url: "/landing",
    views: {
      'menuContent': {
        templateUrl: "components/Landing/landing.html",
        controller: 'LandingCtrl'
      }
    },
  })
  // This is a placeholder view for testing the forum
  .state('app.forum', {
    url: "/forum/:forumid",
    views: {
      'menuContent': {
        templateUrl: "components/Forum/forum.html",
        controller: 'ForumCtrl'
      }
    },
    resolve: {
      forumData: function($stateParams, $location, ForumsFactory) {
        // Pull forum from Firebase database
        var forum = ForumsFactory.getForum($stateParams.forumid);


        forum.$loaded(function() {
          // If forum title is undefined (aka forum doesn't exist), redirect to home
          if (forum.title === undefined) {
            $location.path('/home');
          } 
        });

      },
      simpleObj:  function(){
        return {value: 'simple!'};
      },
    }
  })
  .state('app.forums', {
    url: "/forums",
    views: {
      'menuContent': {
        templateUrl: "components/Forums/forums.html",
        controller: 'ForumsCtrl'
      }
    }
  })
  .state('app.new-forum', {
    url: "/new-forum",
    views: {
      'menuContent': {
        templateUrl: "components/NewForum/new-forum.html",
        controller: 'NewForumCtrl'
      }
    }
  })
  .state('app.addQuestion', {
    url: "/add_question",
    views: {
      'menuContent': {
        templateUrl: "components/Forum/addQuestion.html",
        controller: 'AddQuestionCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
