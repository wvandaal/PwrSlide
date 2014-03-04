// IIFE encapsulates private static methods and variables 
// (see http://polymer-project.org for more info)
(function() {
  var SLIDE_ATTRS_   = ['past', 'current', 'next'],
      PREFIXES_       = ["webkit", "moz", "MS", "o", ""],
      prevSlide_       = 0,

      // Keypress Handler
      onKeyDown_      = function(e) {
        if (/^(input|textarea)$/i.test(e.target.nodeName) ||
            e.target.isContentEditable || !this.controlsActive) {
          return;
        }

        switch (e.keyCode) {
          case 39: // right arrow
          case 32: // space
          case 34: // PgDwn
          case 40: // down arrow
            if (!!e.shiftKey) {    // hold the shift key to skip ahead a slide
              this.current++;
            } else {
              this.nextSlide();
              e.preventDefault();
            }
            break;

          case 37: // left arrow
          case 33: // PgUp
          case 38: // up arrow
            this.prevSlide();
            e.preventDefault();
            break;

          case 70: // F: Enter fullscreen
            if (!(e.shiftKey && e.metaKey)) {
              if (this.mozRequestFullScreen) {
                this.mozRequestFullScreen();
              } else if (this.webkitRequestFullScreen) {
                this.webkitRequestFullScreen();
              }
            }
            break;
        }
    },

    // Utility method for adding vendor prefixes to EventListeners
    addPrefixedListeners_ = function(elem, type, callback) {
      for (var i = PREFIXES_.length - 1; i >= 0; i--) {
        elem.addEventListener(PREFIXES_[i]+type, callback, false);          
      }
    },

    // Adds EventListeners for the deck
    addEventListeners_ = function() {
      document.addEventListener('keydown', onKeyDown_.bind(this), false);
      this.addEventListener('animationend', handleAnimated_.bind(this), false); // moz workaround
      addPrefixedListeners_(this, 'AnimationEnd', handleAnimated_.bind(this));
    },

    // Animation handler, executes slide transitions and animation callbacks
    handleAnimated_ = function(e) {
      if (e.target instanceof PwrAnimated) {
        var el = e.target;
        e.stopPropagation();  // Decks can be controled via keyboard when nested

        // Exit animation actions
        if (e.animationName === el.exit) {
          if (el.nodeName === "PWR-SLIDE") {
            this.curSlide.animateIn();
            updateSlides_.call(this);

            // Remove PwrPiece animations from previous slide after exit
            [].forEach.call(prevSlide_.pieces, function(el) {
              el.removeAnimations();
            });
          }

        // Entrance animation actions
        } else if (e.animationName === el.entrance) {

          // onentry callback called after animation ends
          // NOTE: onexit callback called before exit animation begins
          // (see PwrAnimated)
          if (el.onentry) {
            try {
              new Function(el.onentry).call(el);  
            } catch(e) {
              console.log("onentry callback error: " + e);
            }
          }
        }
      }
    },

    // Loads a slide given a slideNum
    // Changes the curSlide attr, fires the slidechange event, and 
    // animates out the previous slide
    loadSlide_         = function(slideNum) {
      if ((slideNum < 0) || (slideNum >= this.totalSlides)) {
        return null;
      } else {
        prevSlide_ = this.curSlide;
        this.curSlide = this.getSlide(slideNum);
        this.fire('slidechange', {slideIndex: slideNum, curSlide: this.curSlide});
        prevSlide_.animateOut();
      }
    },

    // Iterates through slides to assign them the appropriate value from 
    // SLIDE_ATTRS_ based on this.current attr value
    updateSlides_     = function() {
      var current           = this.current,
          updateSlideAttr    = updateSlideAttr_.bind(this);

      this.curSlide = this.slides[this.current - 1];
      for (var i = 1; i <= this.totalSlides; ++i) {
        switch(i) {
          case current - 1:
            updateSlideAttr(i, 'past');
            break;
          case current:
            updateSlideAttr(i, 'current');
            break;
          case current + 1:
            updateSlideAttr(i, 'next');
            break;
          default:
            updateSlideAttr(i);
            break;              
        }
      }
    },

    // Sets or removes SLIDE_ATTRS_ from slide at given slideNum - 1
    updateSlideAttr_ = function(slideNum, attrName) {
      var slide = this.getSlide(slideNum - 1);

      if (!slide) {
        return;
      }

      if (attrName) {
        slide.setAttribute(attrName, "");
      }

      for (var i = 0, slideAttr; slideAttr = SLIDE_ATTRS_[i]; ++i) {
        if (attrName != slideAttr) {
          slide.removeAttribute(slideAttr);
        }
      }
    };

  Polymer('pwr-deck', {
    // Indicates the current slide number where 1 is the first slide in the
    // pwr-deck
    current: 1,

    // Holds the current PwrSlide object
    curSlide: null,

    // Toggles keyboard controls. By default this is toggled when
    // the mouse enters and leaves this PwrDeck
    controlsActive: false,

    // Manually enables/disables keyboard controls
    enablecontrols: true,

    publish: {

      // The total number of slides in the deck. Used for slide numbers in 
      // the base theme
      totalSlides: 0
    },

    // Callback for when this.current is changed. Loads the slide 
    // corresponding to the new value - 1
    currentChanged: function(oldVal, newVal) {
      if (newVal > 0 && newVal <= this.totalSlides) {
        loadSlide_.call(this, newVal - 1);
      } 
    },

    // Callback for when this.slides is changed. Allows for slide
    // re-ordering
    slidesChanged: function(oldVal, newVal) {
      if ((newVal instanceof Array) || (newVal instanceof NodeList)) {
        updateSlides_.call(this);
      } else {
        this.slides = oldVal;
      }
    },

    ready: function() {
      this.slides = this.$.slides.getDistributedNodes();
      this.totalSlides = this.slides.length;

      addEventListeners_.call(this);
      updateSlides_.call(this);

      if (!!this.onready) {
        try {
          new Function(this.onready)();
        } catch(e) {
          console.log("onready callback error: " + e); 
        }
      }
    },

    keyControlsOff: function(e) {
      if (this.enablecontrols) {
        e.stopPropagation();
        this.controlsActive = false;
      }
    },

    keyControlsOn: function(e) {
      if (this.enablecontrols) {
        e.stopPropagation();
        this.controlsActive = true;
      }
    },

    // Animates the next piece or increments this.current, causing a 
    // transition to the next slide in this.slides
    nextSlide: function() {
      var slide = this.getSlide(this.current - 1);

      if (slide.animateNextPiece()) {
        return;
      }

      if (this.current < this.totalSlides) {
        this.current++;
      }
    },

    // Decrements this.current, causing a transition to the previous 
    // slide in this.slides
    prevSlide: function() {
      if (this.current > 1) {
        this.current--;
      }
    },

    // Returns the slide at the given slideNum
    getSlide: function(slideNum) {
      if ((slideNum < 0) || (slideNum >= this.totalSlides)) {
        return null;
      } else {
        return this.slides[slideNum];
      }
    }
  });
})()