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
app.controller('aboutViewController', function ($scope) {

  /**
   * calculates the height of the view, so the list can
   * expand to fill the screen.
   * */
  var listHeight = $('#aboutBlock').height();
  var viewHeight = $('#aboutView').height();
  var padding = 10;
  var height = viewHeight - listHeight - padding;

  /* array to hold all the jQuery elements */
  var listItems = [$('#listItem0'), $('#listItem1'), $('#listItem2'), $('#listItem3'), $('#listItem4')];
  var listElements = [$('#listElement0'), $('#listElement1'), $('#listElement2'), $('#listElement3'), $('#listElement4')];

  /* this click function is called from the about view */
  $scope.clickListItem = function (index) {
    switch (index) {
      case 0:
        hideAll(0);
        hideOthers(0, showEntry(0));
        break;
      case 1:
        hideAll(1);
        hideOthers(1, showEntry(1));
        break;
      case 2:
        hideAll(2);
        hideOthers(2, showEntry(2));
        break;
      case 3:
        hideAll(3);
        hideOthers(3, showEntry(3));
        break;
      case 4:
        hideAll(4);
        hideOthers(4, showEntry(4));
        break;
      default:
        break;
    }
  };

  /* fade out all the listItems besides the one selected */
  function hideAll(index) {
    for (var i = 0; i < listItems.length; i++) {
      if (i != index)
        listItems[i].fadeOut('fast');
    }
  }

  /**
   *  collapse all the listElements, except the one selected.
   *  this only returns the callback after the last list element
   *  is collapsed.
   * */
  function hideOthers(index, callback) {
    var counter = 0;
    for (var i = 0; i < listElements.length; i++) {
      if (i != index) {
        counter++;
        // if its the last element then return with the callback
        if (counter == listElements.length - 2)
          listElements[i].animate({height: '40px'}, 'fast', function () {
            return callback;
          });
        else
          listElements[i].animate({height: '40px'}, 'fast');
      }
    }
  }

  /**
   * shows one entry of the list:
   *    1. expand list area
   *    2. fade in list item content
   * */
  function showEntry(index) {
    listElements[index].animate({height: height}, 'fast', function () {
      listItems[index].fadeIn('fast');
    });
  }

});
