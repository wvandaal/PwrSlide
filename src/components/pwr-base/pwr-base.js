Polymer('pwr-base', {

  // Returns parent decks for a given element in the order of nearest to
  // farthest ancestor deck. If parameter is specified, returns parent deck
  // at that index
  getParentDecks: function(i) {
    var parent       = this.parentNode,
        parentDecks = [];

    while (parent != null) {
      if (parent instanceof PwrDeck) {
        parentDecks.push(parent);
      }
      parent = parent.parentNode;
    }

    if (!!parentDecks[i]) {
      return parentDecks[i];
    } else {
      return parentDecks;
    }
  }
});