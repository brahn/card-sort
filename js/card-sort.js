var CardSort = (function () {

  var randomPermutation = function (deckSize) {
    var arr = [];
    for (var i = 0 ; i < deckSize ; i++) {
      arr[i] = i;
    }
    return shuffleArray(arr);
  }

  // http://stackoverflow.com/a/12646864/239712
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  var reverseSorted = function (deckSize) {
    var arr = [];
    for (var i = 0 ; i < deckSize ; i++) {
      arr[i] = deckSize - 1 - i;
    }
    return arr;
  }

  //////

  var sort = function (initialDeck) {
    var deckSize = initialDeck.length;
    var steps = [initialDeck];
    var numSteps = Math.ceil(Math.log(deckSize) / Math.log(2));
    for (var i = 0; i < numSteps; i++) {
      steps.push(sortByBit(steps[i], i));
    }
    return steps;
  }

  var sortByBit = function (arr, bitNum) {
    var pile0 = [];
    var pile1 = [];
    for (var i = 0; i < arr.length; i++) {
      var elt = arr[i];
      if (bit(elt, bitNum) == 0) {
        pile0.push(elt);
      } else {
        pile1.push(elt);
      }
    }
    return pile0.concat(pile1);
  };

  var bit = function (num, bitNum) {
    return Math.floor(num / Math.pow(2, bitNum)) % 2;
  };

  //////

  return {
    randomPermutation: randomPermutation,
    reverseSorted: reverseSorted,
    sort: sort,
  };

})();
