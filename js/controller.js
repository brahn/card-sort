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
    sort();
    $("#start-random").click(function () {
      arrangement = "random";
      $("start-random").addClass("active")
      $("start-reversed").removeClass("active")
      sort();
    });
    $("#start-reversed").click(function () {
      arrangement = "reversed";
      $("start-reversed").addClass("active")
      $("start-random").removeClass("active")
      sort();
    });
    $("#deck-size").submit(function () {
      newDeckSize = parseInt($("#deck-size input").val());
      if (!isNaN(newDeckSize)) {
        deckSize = newDeckSize;
        sort();
      }
      return false;
    });
  }

  return {
    init: init
  }

})();

$(document).ready(function () {
  Controller.init();
})
