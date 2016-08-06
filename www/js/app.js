var app = angular.module('FishFate', ['ionic', 'ngCordova']);

/**
 * standard ionic ish
 * */
app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller('fishController', function ($scope, $ionicHistory, $ionicPopup, $cordovaClipboard) {

  $scope.images = {
    demo: 'img/fishDemo_2.gif',
    heads: 'img/coinHeads.png',
    tails: 'img/coinTails.png',
    die: 'img/fishDie.png',
    fishFateIcon: 'img/iconMed.png',

    about: {
      position: 'img/fishPosition.png',
      graph: 'img/graph.png',
      tankSetup: 'img/tankSetup.png'
    }
  };
  $scope.errorMessages = {
    title: '<h3 style="text-align:center">Forgot to feed the fish...</h3>',
    body: [
      "<h4>The fish haven't gathered enough data, please try again later.</h4>",
      "<h4>You don't have internet connection, unable to communicate with the fish.</h4>",
      "<h4>The fish are not cooperating right now, please try again later.</h4>"
    ]
  };


  /* go back button */
  $scope.goBack = function () {
    $ionicHistory.goBack();
  };

  /* error message */
  $scope.displayError = function (status) {
    var messageIndex = 2;
    switch (status) {
      /* no internet connection */
      case -1:
        messageIndex = 1;
        break;
      /* not enough bits in the steam to fill request */
      case 500:
        messageIndex = 0;
        break;
      /* meh, all other errors wont make sense to the user, use generic */
      default:
        messageIndex = 2;
        break;
    }

    /* create a pop-up message to display error text */
    var myPopup = $ionicPopup.prompt({
      template: $scope.errorMessages.body[messageIndex],
      scope: $scope,
      title: $scope.errorMessages.title,
      buttons: [
        {
          text: '<b>done</b>',
          type: 'button-assertive',
          onTap: function (e) {
            return 'okay';
          }
        }
      ]
    });
    myPopup.then(function (res) {
    });
  };


  $scope.copyText = function (value) {
    $cordovaClipboard.copy(value).then(function () {
      console.log("Copied text");
    }, function () {
      console.error("There was an error copying");
    });
  };


  $scope.appRate = function(){
    AppRate.preferences = {
      openStoreInApp: true,
      storeAppURL: {
        ios: '<my_app_id>',
        android: 'market://details?id=com.ionicframework.fishfate542805'
        //windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
        //blackberry: 'appworld://content/[App Id]/',
        //windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
      },
      customLocale: {
        title: "Rate Fish Fate",
        message: "The fish are working hard to get you those random values, why not show your appreciation and rate this app!",
        cancelButtonLabel: "No, Thanks",
        laterButtonLabel: "",
        rateButtonLabel: "Rate It Now"
      }
    };
    AppRate.promptForRating();
  };
});
