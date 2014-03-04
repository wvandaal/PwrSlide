// IIFE encapsulates private static methods and variables 
// (see http://www.polymer-project.org/polymer.html#static for more info)
(function() {

  // Fallback procedure to animate elements in the event of unsupported 
  // browsers/polyfills
  var animateFallback_ = function(animationName) {
    if ((this.style.animationName != animationName) || 
        (this.style.webkitAnimationName != animationName)) {
          this.style.webkitAnimation = this.style.animation = animationName + " 1s both";
    }
  };

  Polymer('pwr-animated', {
    // bound to the <style> tags in subclasses
    animationName: "",

    // Animates the object into the deck. Returns the animated component.
    //
    // Note: the onentry callback is not instantiated here, but rather in 
    // the PwrDeck.handleAnimation_ private method to ensure that the
    // callback is only executed after the entrance animation has finished.
    animateIn: function() {
      return this.applyAnimation(this.entrance);  
    },

    // Animate the object out and calls the onexit callback if it exists.
    // Returns the animated component.
    animateOut: function() {
      if (this.onexit) {
        try {
          // Note: callback is bound to the element
          new Function(this.onexit).call(this);  
        } catch(e) {
          console.log("onexit callback error: " + e);
        }
      }    
      return this.applyAnimation(this.exit);
    },

    // Animates an element. Returns the animated element. Can be used as 
    // utility method through prototype
    // e.g. PwrAnimated.prototype.applyAnimation.call($('#someEl'), "fadeIn");
    applyAnimation: function(animationName) {
      if (!!window.ShadowDOMPolyfill || !(this instanceof PwrAnimated)) {
        animateFallback_.call(this, animationName);
      } else {
        this.animationName = animationName;
      }
      return this;
    }, 

    // Removes any animations from the given element. Returns the element 
    // on which it is called. Can be used as utility method through prototype
    // e.g. PwrAnimated.prototype.removeAnimations.call($('#someEl'));
    removeAnimations: function() {
      return this.applyAnimation('');
    },

    ready: function() {

    }
  });
})();