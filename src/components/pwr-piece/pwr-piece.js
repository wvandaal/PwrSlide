Polymer('pwr-piece', {

  // Specifies the default entrance animation name
  entrance: "fadeIn",

  // Sets the 'show' attribute before calling the parent method:
  // PwrAnimated.prototype.animateIn()
  animateIn: function() {
    this.setAttribute("show", "");
    return this.super();
  },

  // Returns the parent PwrSlide node of the given PwrPiece
  parentSlide: function() {
    var parent = this.parentNode;
    while (!(parent instanceof PwrSlide)) {
      parent = parent.parentNode;
    }
    return parent;
  },

  ready: function() {
    
  }

});