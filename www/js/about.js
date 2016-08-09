/**
 * Created by asakawa on 7/29/16.
 */
var app = angular.module('FishFate');
app.controller('aboutViewController', function ($scope) {


  var LIST_HEIGHT = $('#aboutBlock').height();
  var VIEW_HEIGHT = $('#aboutView').height();
  var PADDING = 10;
  var height = VIEW_HEIGHT - LIST_HEIGHT - PADDING;

  /* array to hold all the jQuery elements */
  var listItems = [$('#listItem0'), $('#listItem1'), $('#listItem2'), $('#listItem3'), $('#listItem4')];
  var listElements = [$('#listElement0'), $('#listElement1'), $('#listElement2'), $('#listElement3'), $('#listElement4')];

  /* this click function is called from the about view */
  $scope.clickListItem = function (index) {
    switch (index) {
      case 0:
        hideAll(0);
        listElements[1].animate({height: '40px'}, 'fast');
        listElements[2].animate({height: '40px'}, 'fast');
        listElements[3].animate({height: '40px'}, 'fast');
        listElements[4].animate({height: '40px'}, 'fast', function () {
          listElements[0].animate({height: height}, 'fast', function () {
            listItems[0].fadeIn('fast');
          });
        });
        break;
      case 1:
        hideAll(1);
        listElements[0].animate({height: '40px'}, 'fast');
        listElements[2].animate({height: '40px'}, 'fast');
        listElements[3].animate({height: '40px'}, 'fast');
        listElements[4].animate({height: '40px'}, 'fast', function () {
          listElements[1].animate({height: height}, 'fast', function () {
            listItems[1].fadeIn('fast');
          });
        });
        break;
      case 2:
        hideAll(2);
        listElements[0].animate({height: '40px'}, 'fast');
        listElements[1].animate({height: '40px'}, 'fast');
        listElements[3].animate({height: '40px'}, 'fast');
        listElements[4].animate({height: '40px'}, 'fast', function () {
          listElements[2].animate({height: height}, 'fast', function () {
            listItems[2].fadeIn('fast');
          });
        });
        break;
      case 3:
        hideAll(3);
        listElements[0].animate({height: '40px'}, 'fast');
        listElements[1].animate({height: '40px'}, 'fast');
        listElements[2].animate({height: '40px'}, 'fast');
        listElements[4].animate({height: '40px'}, 'fast', function () {
          listElements[3].animate({height: height}, 'fast', function () {
            listItems[3].fadeIn('fast');
          });
        });
        break;
      case 4:
        hideAll(4);
        listElements[0].animate({height: '40px'}, 'fast');
        listElements[1].animate({height: '40px'}, 'fast');
        listElements[2].animate({height: '40px'}, 'fast');
        listElements[3].animate({height: '40px'}, 'fast', function () {
          listElements[4].animate({height: height}, 'fast', function () {
            listItems[4].fadeIn('fast');
          });
        });
        break;
      default:
        break;
    }
  };

  function hideAll(index) {
    for (var i = 0; i < listItems.length; i++) {
      if (i != index)
        listItems[i].fadeOut('fast');
    }
  }

});
