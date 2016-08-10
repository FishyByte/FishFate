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


app.controller('fishController', function ($scope, $ionicHistory, $ionicPopup, $cordovaClipboard, $http, $ionicLoading, $interval) {


  fishStream();
  var MIN_BITS = 8192;


  $scope.bitStream = '';

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


  $scope.appRate = function () {
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

  function fishStream() {
    var inProgress = false;
    if (window.localStorage.getItem('fishBits') == null)
      requestBits('16384');
    $interval(function () {
      try {
        if (!inProgress) {
          var bits = window.localStorage.getItem('fishBits');
          if (bits.length < MIN_BITS) {
            inProgress = true;
            requestBits('8192');
            setTimeout(function () {
              inProgress = false;
            }, 1000 * 5); // wait before release the inProgress lock
          }
        }
      }
      catch (Exception) {
        requestBits('8192');
      }
    }, 500);

  }

  function requestBits(quantity) {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-royal"></ion-spinner>'
    });
    var currentBits = window.localStorage.getItem('fishBits');
    if (currentBits == null)
      currentBits = '';
    delete $http.defaults.headers.common['X-Requested-With'];
    $http({
      method: "GET",
      url: 'https://fish-bit-hub.herokuapp.com/get-binary',
      headers: {'quantity': quantity},
      crossDomain: true
    }).then(function successCallback(response) {
      window.localStorage.setItem("fishBits", currentBits + response.data);
      $ionicLoading.hide();
    }, function errorCallback(response) {
      $ionicLoading.hide();
      console.log(response);
    });
  }
});


app.factory('fishStream', function () {
  var fishStream = {};
  fishStream.getBits = function (amount) {
    var bits = window.localStorage.getItem('fishBits');
    var bitsRequested = bits.slice(0, amount);
    bits = bits.replace(bitsRequested, '');
    window.localStorage.setItem("fishBits", bits);
    return bitsRequested;
  };

  fishStream.getInt = function (max) {
    var intFound = false;
    var integer = -1;
    while (!intFound) {
      var numberBits = Math.ceil(Math.log2(max + 1));
      var bitString = fishStream.getBits(numberBits);
      integer = parseInt(bitString, 2);
      if (integer < max)
        intFound = true;
    }
    return integer
  };

  fishStream.getHex = function (quantity) {
    var response = '';
    for (var j = 0; j < quantity; j++) {
      var binaryString = String(fishStream.getBits(4));
      var z = -1;
      var number = 0;
      for (var i = binaryString.length; i > -1; i--) {
        //Every 1 in binary string is converted to decimal and added to number
        if (binaryString.charAt(i) == "1")
          number += Math.pow(2, z);
        z += 1;
      }
      // convert to hex
      var hexValue = number.toString(16);
      // make uppercase
      hexValue = hexValue.toUpperCase();
      response += hexValue;
    }
    return response;
  };

  return fishStream;
});
