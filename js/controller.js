var Controller = (function () {

  var deckSize = 52;
  var arrangement = 'random';

  var sortRandom = function (deckSize) {
    var deck = CardSort.randomPermutation(deckSize);
    SortVisualizer.drawSort(CardSort.sort(deck));
  };

  var sortReverse = function (deckSize) {
    var deck = CardSort.reverseSorted(deckSize);
    SortVisualizer.drawSort(CardSort.sort(deck));
  };

  var sort = function () {
    if (arrangement == 'reverse') {
      sortReverse(deckSize);
    } else {
      sortRandom(deckSize);
    }
  }

  var init = function () {
    SortVisualizer.setup();
    sort();
  }

  return {
    init: init
  }

})();

$(document).ready(function () {
  Controller.init();
})
