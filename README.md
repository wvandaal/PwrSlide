
#PwrSlide

Adios Powerpoint! PwrSlide is a compact yet powerful presentation interface built to help users embrace the future of interactive presentation software using the power of HTML5 and Web Components. A small set of intuitive custom tags allow you to build your presentations from the ground up and gives you the flexibility to embed complex web applications within your slide show.

PwrSlide is an open source project implemented using the upcoming HTML5 standard of Web Components and the [Polymer.js library](http://polymer-project.org) by Google. 

> [Maintained by Willem van Daalen](https://github.com/wvandaal).

## Background
PwrSlide was born from a desire to leverage the declarative nature of HTML and the power of JavaScript to create engaging presentations which would allow users to demonstrate their ideas within a programming environment, namely the web browser. However the difficulty in using HTML, CSS, and JS to create presentations is that they are limited by shortcomings inherent in the web platform, particularly with regard to stylistic and functional encapsulation.  

Fortunately, an emerging specification called **Web Components** allows for the creation of custom HTML elements with their own unique logic (much like browser-makers' implementation of the complex `<video>` tag). The benefits of this new spec is that it allows the presentation logic to exist in a separate scope from the content, allowing the author to easily embed complex logic within slides without fear of conflict. Your presentation architecture will never be the same once you realize you can easily embed slide decks within individual slides (check out the [demo presentation](http://wcvd.me/PwrSlide) to see this in action).

Another advantage of using Web Components is that the PwrSlide tags have been created with their own set of custom methods and attributes, allowing them to be controlled by the user easily within the DOM: 

```javascript
// Transition to the next slide in the deck
document.querySelector('pwr-deck').nextSlide();

// Animate the current slide out
document.querySelector('pwr-deck').curSlide.animateOut();

// Transition to the fourth slide
document.querySelector('pwr-deck').current = 4;
```

**Web Components** are an exciting new phase in web design and I would encourage those who are interested to watch [Eric Bidelman's presentation from Google I/O 2013](http://www.youtube.com/watch?v=fqULJBBEVQE) or to visit the [Polymer Project](http://polymer-project.org) website for further information.

## Demo

> [Check it live](http://wcvd.me/PwrSlide).

## Usage

### Setup
To begin using PwrSlide in your website, I recommend that you use bower to install the various components, themes, and dependencies:

```
bower install PwrSlide
```

Once you have installed PwrSlide, import the files into your project page in the following order:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Project Title</title>

    <script src="bower_components/platform/platform.js"></script>
    <script src="bower_components/polymer/polymer.js"></script>

    <!-- Importing PwrSlide Suite -->
    <link rel="import" href="bower_components/PwrSlide/src/config.html">

    ...

</head>
```

You will notice that the usual `<link>` tag, normally associated with `rel="stylesheet"`, is being used as an HTML import, a part of the Web Components spec that allows HTML code to be imported into another document. This enables HTML, CSS, and JavaScript to be packaged neatly together without requiring the loading of separate libraries. However, since this is a new spec and not fully implemented in all browsers, the Polymer polyfills must be included separately and prior to the HTML import in order for it to work in standard browsers. 

Exploring the `config.html` file will reveal that the various components, stylesheets, fonts and themes have all been loaded within this HTML import. To add or remove elements from your project, simply edit this file to contain the resources you wish to include. By default, PwrSlide comes packaged with the three core web components required to build a presentation, the PwrSlide base theme, six custom slide color themes, four custom theme fonts, and the [Google code prettifier](http://google-code-prettify.googlecode.com/svn/trunk/README.html).

### PwrSlide Components
PwrSlide was designed to be modular - you pick what you want and leave the rest behind. The core of the framework resides in the custom Web Components, which encapsulate the basic logic and styling of the presentation: 

**Super Classes:**
- [PwrBase](#pwrbase)  
- [PwrAnimated](#pwranimated)  
  
**Core Components:**  
- [PwrDeck](#pwrdeck)  
- [PwrSlide](#pwrslide)  
- [PwrPiece](#pwrpiece)  

> **Note:** The PwrAnimated and PwrBase constructors are parent classes which serve as modules for the main core components and provide a number of utility methods; they should not be used as tags in your HTML.

### Basic Structure
The fundamental structure of a PwrSlide presentation consists of a `<pwr-deck>` containing any number of `<pwr-slide>` tags, each with their own content. To animate content within a slide, simply wrap it in `<pwr-piece>` tags. 
```html
<body>
    ...
    <pwr-deck unresolved>
        <pwr-slide>        
            <!-- Your slide content goes here -->
            <ul>
                <pwr-piece>
                    <li>Something you want animated within the slide</li>
                </pwr-piece>
            </ul>
        </pwr-slide>
        <pwr-slide> ... </pwr-slide>
        <pwr-slide> ... </pwr-slide>
        <pwr-slide> ... </pwr-slide>
    </pwr-deck>
    ...
</body>
```

###Theming

In addition to the core components, PwrSlide includes an optional responsive theme complete with several slide color themes. Add some style to your deck with ease:

```html
<pwr-deck unresolved>
    <pwr-slide class="gold title-slide animated"> ... </pwr-slide>
    <pwr-slide class="red animated">        
        <header>
            <h1>Earth-Shattering Presentation Title!</h1>
            <h2>Some Nice Subheading</h2>
            <h3>Even More Subheadings</h3>
        </header>
        <section>
            <header>Section Header</header>
            <ul>
                <pwr-piece>
                    <li>Something you want animated within the slide</li>
                </pwr-piece>
            </ul>
        </section>
    </pwr-slide>
    <pwr-slide class="blue centered-column animated"> ... </pwr-slide>
    <pwr-slide class="two-column"> ... </pwr-slide>
    <pwr-slide class="black segue-slide animated"> ... </pwr-slide>
    ...
</pwr-deck>
```

Check out the [Theming Guide](./theme) for a detailed walkthrough.

## Components
### PwrBase
The PwrBase constructor is one of two super-classes implemented to provide utility methods to the PwrSlide core components (i.e. [PwrDeck](#pwrdeck), [PwrSlide](#pwrslide), and [PwrPiece](#pwrpiece)). All other elements extend the PwrBase constructor, so any methods or attributes added to this element will be usable in all other PwrSlide components.

#### Attributes
*None*

#### Methods
Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`getParentDecks(i)`   | *integer*       | `[PwrDeck]`         | This is a utility method which can be useful when using animation callbacks (see [PwrAnimated](#pwranimated)) to manipulate the deck contents. The optional parameter `i` specifies the which parent deck to return (e.g. `getParentDecks(0)` will return the first ancestor deck, or `parentDecks[0]`); if left unspecified, an array of all ancestor PwrDeck nodes will be returned in order of closest ancestor.

> **Note:** The utility methods of PwrBase and PwrAnimated can be used on regular elements by calling them from the prototype.

### PwrAnimated
> **Inheritance:** [PwrBase](#pwrbase) > PwrAnimated

The PwrAnimated constructor is the parent class for all animated components in the PwrSlide core (i.e. [PwrSlide](#pwrslide) and [PwrPiece](#pwrpiece)), and as such, much of the power in PwrSlide <small>(bad pun)</small> resides therein. To truly leverage the flexibility of PwrSlide, a comprehensive understanding of this class is recommended.  

#### Attributes

Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`entrance`      | *string*             | `""`          | This attribute specifies the keyframe name of the entrance animation of the slide. PwrSlide ships with the basic "fadeIn" and "fadeOut" animations standard, however you can define your own keyframes or load an animation library (like [Animate.css](https://daneden.me/animate/), which is packaged with the [PwrSlide Base Theme](./theme#base-theme))
`exit`      | *string*             | `""`          | Similar to the `entrance` attribute, this specifies the keyframe name for the exit animation.
`onentry`      | *string*             | `""`          | Entrance animation callback. This attribute allows the user to specify JavaScript code to be executed **at the end** of the entrance animation. This attribute functions similarly to the `onclick` attribute in standard HTML. **Note:** For convenience, both entrance and exit callbacks are bound to the element on which they are called.
`onexit`      | *string*             | `""`          | Exit animation callback. Similar to `onentry`, this attribute allows the user to specify JavaScript code to be executed **at the start** of the exit animation. This attribute functions similarly to the `onclick` attribute in standard HTML. **Note:** For convenience, both entrance and exit callbacks are bound to the element on which they are called.

##### Animation Callbacks
Animation callbacks are one of the most powerful and useful features in PwrSlide, allowing you to execute code at a specific point in your deck and greatly expanding the flexibility of your presentation. The possible uses of this functionality are vast, ranging from making AJAX calls to external APIs for up-to-date data, to demonstrating time-sensitive code such as that of a JS video game.

Additionally, many of the utility methods provided by the PwrSlide super-classes have been designed with animation callbacks in mind. Because animation callbacks are bound, by default, to the object on which they are called, these utility methods can be used to manipulate several elements of your presentation at once:

```html
<pwr-slide>
    <ul>
        <!-- Animates in the #inner-deck and sets the current slide to 3 -->
        <pwr-piece onentry="this.parentSlide().animatePiece(2).children[0].current=3;">
            <li>Some awesome talking point!</li>
        </pwr-piece>
        <pwr-piece><li>Another stunning insight!</li></pwr-piece>
    </ul>
    <pwr-piece id="inner-deck">
        <pwr-deck>
            <pwr-slide> ... </pwr-slide>
            <pwr-slide> ... </pwr-slide>
            <pwr-slide> ... </pwr-slide>
            ...
        </pwr-deck>
    </pwr-piece>
</pwr-slide>
```

> **Note:** As mentioned previously, the `onentry` callback is executed once the entrance animation has finished, whereas the `onexit` callback is executed immediately before the exit animation begins. As such, it is advisable that you avoid using flow-blocking functions (e.g. `alert();`) within the `onexit` callback, since they will prevent the animation from being executed until they return.

#### Methods  
The PwrAnimated class provides a number of methods to enable you to manipulate the animations of PwrSlide components, as well as standard HTML elements:

Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`animateIn()`   | N/A                     | `PwrAnimated`     | Applies the keyframe animation name specified in the `entrance` attribute. Depending on the subclass, if no entrance is specified, a default value of "fadeIn" will be used. This method will return the object it is called on.
`animateOut()`   | N/A                     | `PwrAnimated`     | Similar to the above method, this function applies the keyframe animation name specified in the `exit` attribute. Unlike `animateIn()` however, by default the [PwrPiece](#pwrpiece) has no exit animation unless one is explicitly specified. 
`applyAnimation(animationName)`   | *string*   | `PwrAnimated`     | This method is primarily used within the `animateIn()` and `animateOut()` methods, but has been provided as a utility method on the PwrAnimated prototype to allow the user to animate any element in the DOM.
`removeAnimations()`   | N/A  | `PwrAnimated`     | Similar to `applyAnimations()`, this utility method is primarily used on the slide transitions to remove animations from PwrPieces within off-screen slides. It has been attached to the PwrAnimated prototype to allow the user to easily remove the animations from a given element in the DOM.

> **Note:** As mentioned, the utility methods `applyAnimation()` and `removeAnimations()` have been provided to allow the user to easily animate any element in the DOM. To do this, simply call these methods from the PwrAnimated prototype: `PwrAnimated.prototype.applyAnimation.call(el, "bounce")`

<br>
### PwrDeck
> **Inheritance:** [PwrBase](#pwrbase) > PwrDeck

The PwrDeck object serves as the main container for your presentation deck, keeping track of all your slides and providing you with a number of methods to access them. A new deck is created by inserting the `<pwr-deck>` tags into your HTML and filling them with zero or more `<pwr-slide>` tags.

#### Keyboard Controls
The `right →`, `space`, `PgDwn`, and `down ↓` will queue the next presentation animation (either the next slide or next [PwrPiece](#pwrpiece)). Holding down the `shift` key allows the user to skip to the next slide without queuing any intermediate [PwrPieces](#pwrpiece).  

Similarly, the `left ←`, `PgUp`, and `up ↑` will go back to the previous slide. Any previously animated [PwrPieces](#pwrpiece) will be shown as before.

Pressing the `F` key will enable fullscreen mode. Press `esc` when in fullscreen mode to return to the browser window.

#### Attributes
Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`unresolved`      | N/A                 | `""`               | This a polyfill attribute from the Polymer Library. It is **highly** recommended that you label your deck with the `unresolved` attribute to prevent a FOUC while the Web Components are loaded and registered in the DOM. The Polymer library will remove this attribute from the DOM at load time.
`onready`      | *string*                  | `""`               | The `onready` attribute allows the user to specify a function callback to be called once the deck is registered and instantiated in the document. A common use case for this attribute is to call the `prettyPrint()` function to enable code highlighting.
`current`      | *integer*                  | `1`               | Sets the value of the current slide being displayed by the deck. This attribute can be changed via JavaScript, causing the currently displayed slide to animate out and the new corresponding slide to be animated into the view. Setting this value in you HTML will dictate the starting slide in your presentation (useful for debugging specific slides).
`enablecontrols`      | *boolean*        | `true`              | This attribute allows the user to manually enable/disable the keyboard controls for a given deck. **Note:** Disabling keyboard controls will also prevent PwrPieces from being animated on a keypress, it is recommended that the user add the [PwrPiece](#pwrpiece) `show` attribute to all pieces they wish to be displayed while key controls are disabled. 
`slidenumbers`      | *boolean*        | `true`              | Used by the [Base Template](#base-template) to insert slide numbers into the presentation deck. By default, no slide numbers are displayed on the first slide of the presentation, however this can be changed by explicitly setting the `current` attribute to 1.
`curSlide`      | *integer* 	   | `null`              | Returns the current `PwrSlide` object being displayed by the deck.
`controlsActive`   | *boolean*                     | `false`               | Enables/disables the keyboard controls for the deck. This attribute is toggled by hovering over the deck you wish to control. For nested decks within slides, hovering over the inner deck will deactivate the keyboard controls for the outer deck, allowing the user to switch through inner slides while remaining on the current outer slide. **Note:** This attribute is not intended to be manipulated directly by the user and is intended for only internal use. To enable or disable keyboard controls manually, change the value of the `enablecontrols` attribute.
`totalSlides`   | *integer*                     | `0`               | Returns the total number of slides in the deck. Used for slide numbering in the base theme.
`slides`   | *NodeList*                     | `[]`               | Returns a NodeList (or an Array in polyfilled browsers) containing all of the PwrSlides objects within the given deck. **Note:** Changing the contents of the this attribute will alter the order of your presentation, do so with caution.

By default, the deck will load the slides in order of their declaration in the deck, however this can be changed by by setting the `current` attribute to a different value and/or changing the order of the `slides` NodeList:

```html
<!-- Begin on the third slide -->
<pwr-deck unresolved current="3">
    <pwr-slide> ... </pwr-slide>
    <pwr-slide> ... </pwr-slide>
    <pwr-slide> ... </pwr-slide>
    ... 
</pwr-deck>

// Transition to the sixth slide
document.querySelector('pwr-deck').current = 6;

<script type="text/javascript">
    // Reverse the slide order
    var slides = document.querySelector('pwr-deck').slides;
    slides = [].reverse.call(slides);   
</script>
```

#### Methods
The PwrDeck object exposes several methods for the user to interact with, allowing slides to be changed on the fly using JavaScript:

Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`nextSlide()`   | N/A                     | N/A               | Animates the next `PwrPiece` or transitions to the next slide in order. This method is called on when `controlsActive=true` and the user presses right, down, space, or PgDwn. Fires a `slidechange` event.
`prevSlide()`   | N/A                     | N/A               | Transitions to the previous slide in order. This method is called on when `controlsActive=true` and the user presses left, up, or PgUp. Fires a `slidechange` event.
`getSlide(slideNum)`   | *integer*     | `PwrSlide`            | Returns the slide in the current deck corresponding to its index in the `slides` NodeList.

> **Note:** Holding the down `shift` allows you to skip ahead to the next slide without animating any un-animated PwrPieces

##### The `slidechange` Event
The `slidechange` event is fired when the currently displayed slide leaves the view and is replaced by another slide. The `event.details` contains an object representing the current state of the PwrDeck, namely the `slideIndex` and the `curSlide`. This event can be used to synchronize different decks, allowing you to queue presenter notes, trigger slide changes in other presentations, etc. 

<br>
### PwrSlide
> **Inheritance:** [PwrBase](#pwrbase) > [PwrAnimated](#pwranimated) > PwrSlide  

Here liveth your content! Whereas much of the internal logic resides within the PwrDeck object, the PwrSlide class is where much of the expressive power of this library can truly be leveraged.  

> **Note:** Much of the functionality of the PwrSlide class is inherited from the PwrAnimated constructor, [visit its section](#pwranimated) for more detailed descriptions.

#### Attributes
Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`pieces`   | *NodeList*                | `[]`           | Returns a NodeList (or an Array in polyfilled browsers) containing all of the `<pwr-piece>` tags in descending order.
`curPiece`   | *PwrPiece*                | `null`           | Returns the most recently animated PwrPiece in the given slide.
`entrance` | *string*                  | `"fadeIn"`          | **Inherited from [PwrAnimated](#pwranimated).** Specifies keyframe animation name for the slide entrance.
`exit` | *string*                  | `"fadeOut"`          | **Inherited from [PwrAnimated](#pwranimated).** Specifies keyframe animation name for the slide exit.
`onentry` | *string*                  | `""`          | **Inherited from [PwrAnimated](#pwranimated).** Entrance animation callback, this code is executed once the entrance animation is completed.
`onexit` | *string*                  | `""`          | **Inherited from [PwrAnimated](#pwranimated).** Exit animation callback, this code is executed when the exit animation begins.

#### Methods
> **Note:** You may notice that the [PwrAnimated](#pwranimated) methods inherited by PwrSlide are not listed below. Although they may be called manually, the implementation of the slide transitioning functionality in the [PwrDeck](#pwrdeck) object prevents these methods from functioning as expected when called by the user. It is recommended that you use the `PwrDeck.current` attribute to change slides to ensure proper slide transitioning occurs.

Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`animateNextPiece()`   | N/A            | `PwrPiece`               | Animates the next piece in or out when the `nextSlide()` keypress is triggered. Pieces with entrance animations are animated in in descending order (see [PwrPiece](#pwrpiece) for an example). Once all pieces have been animated in, each piece with a exit animation defined is animated out in descending order. This method returns the animated `PwrPiece`.
`animatePiece(p, dir)`   | *integer* or *PwrPiece*, *string*   | `PwrPiece`          | This auxiliary method can be used to animate a `PwrPiece` out of order. It takes an argument `p` which can be either the index of the piece in the `pieces` attribute or the `PwrPiece` itself, and an optional directional argument `dir` which specifies if you want the `PwrPiece` animated in or out (e.g. `animatePiece(2, "out")`). By default `dir="in"` unless the specified piece has already been animated in. This method returns the piece being animated. **Note:** if a piece is animated out of order, that animation will be skipped by the `animateNextPiece()` method.

<br>
### PwrPiece
> **Inheritance:** [PwrBase](#pwrbase) > [PwrAnimated](#pwranimated) > PwrPiece

The `<pwr-piece>` tag allows the user to easily denote elements they wish to be animated incrementally within the slide on a `nextSlide()` keypress (see [PwrSlide](#pwrslide)). PwrPieces are animated in descending order 'in' then 'out' (if specified). For example:

```html
<pwr-slide>
    <pwr-piece id="piece1"> ... </pwr-piece>
    <pwr-piece id="piece2" exit="fadeOut"> ... </pwr-piece>
    <pwr-piece id="piece3" exit="fadeOut"> ... </pwr-piece>
</pwr-slide>
```

In the above slide, the PwrPieces will be animated in the following order:

1) `#piece1` animated in
2) `#piece2` animated in
3) `#piece3` animated in
4) `#piece2` animated out
5) `#piece3` animated out


By default, PwrPieces are initially hidden from view when a new slide is visited, however once they are animated in, they will remain visible unless the `show` attribute is explicitly removed (see below). 

> **Note:** Much of the functionality of the PwrPiece class is inherited from the PwrAnimated constructor, [visit its section](#pwranimated) for more detailed descriptions.

#### Attributes

Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`show`      | N/A                      | `null`              | Since PwrPieces are hidden by default, add this attribute to a PwrPiece to prevent the default hiding action. This is useful for elements you wish to animate "out" but not "in". The `animateIn()` method of this class will add the `show` attribute to the given PwrPiece node and the `animateOut()` method will likewise remove it.
`entrance` | *string*                  | `"fadeIn"`          | **Inherited from [PwrAnimated](#pwranimated).** Specifies keyframe animation name for the slide entrance.
`exit` | *string*                  | `""`          | **Inherited from [PwrAnimated](#pwranimated).** Specifies keyframe animation name for the slide exit.
`onentry` | *string*                  | `""`          | **Inherited from [PwrAnimated](#pwranimated).** Entrance animation callback, this code is executed once the entrance animation is completed.
`onexit` | *string*                  | `""`          | **Inherited from [PwrAnimated](#pwranimated).** Exit animation callback, this code is executed when the exit animation begins.

#### Methods

Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`parentSlide()`      | N/A              | `PwrSlide`         | This utility method is provided to allow users to quickly access the nearest ancestor PwrSlide node. This is particularly useful in the context of [animation callbacks](#animation-callbacks) and can be called on other elements from the PwrPiece prototype. 
`animateIn()`      | N/A              | `PwrPiece`         | **Inherited from [PwrAnimated](#pwranimated).** This method will apply the given `entrance` animation to the PwrPiece. In addition, it will set the `show` attribute. **Note:** Calling this method will not influence order of PwrPiece animation in the parent slide, meaning that your element may be animated again if it has not already been reached in the animation queue. To animate a PwrPiece out of order and remove it from the queue, use the `animatePiece(p, dir)` method in the [PwrSlide](#pwrslide) object.
`animateOut()`      | N/A              | `PwrPiece`         | **Inherited from [PwrAnimated](#pwranimated).** This method will apply `exit` animation to the PwrPiece if one is specified. Unlike the `animateIn()` method however, this method will not remove the `show` attribute from given PwrPiece. **Note:** As mentioned above, calling this method will not influence order of PwrPiece animation in the parent slide, meaning that your element may be animated again if it has not already been reached in the animation queue. To animate a PwrPiece out of order and remove it from the queue, use the `animatePiece(p, dir)` method in the [PwrSlide](#pwrslide) object.


## Contributing

This is my first foray into Web Components and I would gladly welcome your help! To contribute to this project simply,

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Submit a pull request.

As previously mentioned, I have attempted to make this project as modular as possible and I would encourage you to do the same; all presentations are not created equal and it is crucial that we allow users the flexibility to create as they so choose. Happy hacking!

## License

[MIT License](http://opensource.org/licenses/MIT)