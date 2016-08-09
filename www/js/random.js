/**
 * Created by asakawa on 7/29/16.
 */

var app = angular.module('FishFate');
app.controller('randomController', function ($scope, $http, $ionicPopup, $ionicLoading) {
  /* these arrays are used for formatting the pop up responses */
  var titleArray = [
    'The fish retrieved this number for you',
    'The fish retrieved this binary string for you',
    'The fish retrieved these hexadecimals for you'
  ];

  /* formats the errors responses into html snippets*/
  var responseArray = [
    '<h1 style="text-align: center">{{randoms.getInt.response}}</h1>',
    '<h4 style="text-align: center">{{randoms.getBinary.response}}</h4>',
    '<h3 style="text-align: center">{{randoms.getHex.response}}</h3>'
  ];

   var randomElements = [$('#randomInt'), $('#randomBin'), $('#randomHex')];



  /* scope variable, the following are the default values */
  $scope.randoms = {
    menuSelection: 0,
    getInt: {
      minValue: '0',
      maxValue: '100',
      range: '100',
      response: ''
    },
    getBinary: {
      quantity: '32',
      response: ''
    },
    getHex: {
      quantity: '6',
      response: ''
    }
  };


  $scope.menuSelection = function(select){
    showSelected(select);
  };


  // When button is clicked, the popup will be shown...
  $scope.getInt = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-royal"></ion-spinner>'
    });

    var range = parseInt($scope.randoms.getInt.maxValue) - parseInt($scope.randoms.getInt.minValue);
    delete $http.defaults.headers.common['X-Requested-With'];
    $http({
      method: "GET",
      url: 'https://fish-bit-hub.herokuapp.com/get-ints',
      headers: {
        'quantity': '1',
        'max_value': String(range + 1)
      },
      crossDomain: true
    }).then(function successCallback(response) {
      $ionicLoading.hide().then(function () {
        return true;
      });
      $scope.randoms.getInt.response = String(parseInt(response.data) + parseInt($scope.randoms.getInt.minValue));
      popUpResponse(0, $scope.randoms.getInt.response);

    }, function errorCallback(response) {
      $ionicLoading.hide().then(function () {
        return true;
      });
      $scope.displayError(response.status);
    });
  };

  // When button is clicked, the popup will be shown with results
  $scope.getBinary = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-royal"></ion-spinner>'
    });
    delete $http.defaults.headers.common['X-Requested-With'];
    $http({
      method: "GET",
      url: 'https://fish-bit-hub.herokuapp.com/get-binary',
      headers: {
        'quantity': $scope.randoms.getBinary.quantity
      },
      crossDomain: true
    }).then(function successCallback(response) {
      $ionicLoading.hide().then(function () {
        return true;
      });
      $scope.randoms.getBinary.response = response.data;
      popUpResponse(1, $scope.randoms.getBinary.response);
    }, function errorCallback(response) {
      $ionicLoading.hide().then(function () {
        return true;
      });
      $scope.displayError(response.status);
    });
  };

  $scope.getHex = function () {

    delete $http.defaults.headers.common['X-Requested-With'];
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-royal"></ion-spinner>'
    });
    $http({
      method: "GET",
      url: 'https://fish-bit-hub.herokuapp.com/get-hex',
      headers: {
        'quantity': $scope.randoms.getHex.quantity
      },
      crossDomain: true
    }).then(function successCallback(response) {
      $ionicLoading.hide().then(function () {
        return true;
      });
      $scope.randoms.getHex.response = hexRemoveLong(response.data);

      popUpResponse(2, $scope.randoms.getHex.response);
    }, function errorCallback(response) {
      $ionicLoading.hide().then(function () {
        return true;
      });
      $scope.displayError(response.status);
    });
  };


  var popUpResponse = function (index, response) {
    // ionic pop up response
    var myPopup = $ionicPopup.prompt({
      template: responseArray[index],
      scope: $scope,
      title: titleArray[index],
      buttons: [
        {
          text: '<b>copy to clipboard</b>',
          type: 'button-assertive',
          onTap: function (e) {
            return $scope.copyText(response);
          }
        },
        {
          text: '<b>done</b>',
          type: 'button-assertive',
          onTap: function (e) {
            return 'done';
          }
        }
      ]
    });

    myPopup.then(function (res) {
      /* were done, nuke the responses */
      $scope.randoms.getInt.response = '';
      $scope.randoms.getBinary.response = '';
      $scope.randoms.getHex.response = '';
    });
  };

  /* helper function to remove the "L" from long hex */
  function hexRemoveLong(responseString) {
    var lastChar = responseString.charAt(responseString.length - 1);
    if (lastChar == "L") {
      responseString = responseString.slice(0, -1);
    }
    return responseString;
  }

  function showSelected(index){
    for (var i=0; i < randomElements.length; i++){
      randomElements[i].fadeOut('fast');
    }
    randomElements[index].fadeIn('slow');
  }
});
