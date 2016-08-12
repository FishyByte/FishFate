/**
 * Copyright (c) 2016 Christopher Asakawa, Nicholas McHale, Matthew O'Brien, Corey Aing
 * This code is available under the "MIT License".
 * Please see the file COPYING in this distribution
 * for license terms.
 */

/**
 * Created by asakawa on 7/29/16.
 */

var app = angular.module('FishFate');
app.controller('randomController', function ($scope, $http, $ionicPopup, $ionicLoading, fishStream) {
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
    var max = parseInt($scope.randoms.getInt.maxValue);
    var min = parseInt($scope.randoms.getInt.minValue);
    var range = max - min + 1;
    $scope.randoms.getInt.response = String(fishStream.getInt(range) + min);
    popUpResponse(0, $scope.randoms.getInt.response);
  };

  // When button is clicked, the popup will be shown with results
  $scope.getBinary = function () {
    $scope.randoms.getBinary.response = fishStream.getBits($scope.randoms.getBinary.quantity);
    popUpResponse(1, $scope.randoms.getBinary.response);
  };

  $scope.getHex = function () {
    // Return is converting decimal to hexadecimal
    $scope.randoms.getHex.response = fishStream.getHex($scope.randoms.getHex.quantity);
    popUpResponse(2, $scope.randoms.getHex.response);
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

  function showSelected(index){
    for (var i=0; i < randomElements.length; i++){
      randomElements[i].fadeOut('fast');
    }
    randomElements[index].fadeIn('slow');
  }
});
