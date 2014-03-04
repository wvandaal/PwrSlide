// IIFE encapsulates private static methods and variables 
// (see http://www.polymer-project.org/polymer.html#static for more info)
(function() {

  // Collects PwrPieces for animation.
  var collectAnimationPieces_ = function() {
      this.animateInPieces = [].filter.call(
        this.pieces, function(el) {
          return (typeof el.entrance === "string" && el.entrance.length);
        });
      this.animateOutPieces = [].filter.call(
        this.pieces, function(el) {
          return (typeof el.exit === "string" && el.exit.length);
        });
    };

  Polymer('pwr-slide', {

    // Specifies the default entrance animation name
    entrance: "fadeIn", 

    // Specifies the default exit animation name
    exit: "fadeOut",

    // Animates a specific piece in the given slide given either an index
    // or PwrPiece object as 'p'. An optional second argument can be passed
    // to indcate that the piece should be animated "out", regardless of 
    // whether or not it has been animated in yet: 
    // (e.g. animatePiece(2, "out");). Returns the animated PwrPiece.
    //
    // Note: Once a piece is animated, the corresponding instance is 
    // removed from the appropriate animation queue to ensure that the same 
    // animation is not called twice.
    animatePiece: function(p) {
      var piece, i;
      
      // Collect animateIn/animateOut pieces on the first call
      if (!this.animateInPieces || !this.animateOutPieces) {
        collectAnimationPieces_.call(this);
      }

      // Finds the appropriate piece given an index or PwrPiece object
      if (p >= 0 && p < this.pieces.length) {
        piece = this.pieces[p];
      } else if ([].indexOf.call(this.pieces, p) >= 0) {
        piece = p;
      } else {
        return null;
      }

      if (piece) {
        if ((typeof arguments[1] === "string" && arguments[1].toLowerCase() === "out") || 
            !!!this.animateInPieces.indexOf(piece)) {
          i = this.animateOutPieces.indexOf(piece);
          piece = this.animateOutPieces.splice(i, 1)[0];
          piece.animateOut();
        } else {
          i = this.animateInPieces.indexOf(piece);
          piece = this.animateInPieces.splice(i, 1)[0];
          piece.animateIn();
        }
      }
      return piece;
    },

    // Animates the next piece in the given slide. The order of animation
    // is descending from top to bottom, with all entrance animations 
    // executed in order, followed by all exit animations in order.
    // Returns the animated PwrPiece.
    // 
    // Note: Since exit animations on PwrPieces are, by default, undefined,
    // only pieces with explicitly specified exit animations will be 
    // animated.
    animateNextPiece: function() {

      // Collect animateIn/animateOut pieces on the first call
      if (!this.animateInPieces || !this.animateOutPieces) {
        collectAnimationPieces_.call(this);
      }

      if (this.curPiece = this.animateInPieces.shift()) {
        return this.curPiece.animateIn();
      } else if (this.curPiece = this.animateOutPieces.shift()) {
        return this.curPiece.animateOut();
      } else {
        return null;
      }
    },

    ready: function() {

      // Collects all pwr-pieces
      this.pieces = this.querySelectorAll('[is="pwr-piece"], pwr-piece');
    },
  });
})();