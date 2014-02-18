<link href='http://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
<style type="text/css">
    h1 {
        text-align: center;
        font-family: "Pacifico", cursive;
    }
</style>
<h1>PwrSlide</h1>

Adios Powerpoint! PwrSlide is a simple and compact presentation interface built to help users emprace the future of interactive presentation software using the power of HTML5 and Web Components. A small set of intiutive custom tags allow you to build your presentations from the ground up and gives you the flexibility to embed complex web applications within your slideshow.

PwrSlide is an open source project implemented using the upcoming HTML5 standard of Web Components and the [Polymer.js library](http://polymer-project.org) by Google. 

> [Maintained by Willem van Daalen](https://github.com/wvandaal).

## Background
PwrSlide was born from a desire to leverage the declarative nature of HTML and the power of JavaScript to create engaging presentations which would allow users to demonstrate their ideas within a programming environment, namely the web browser. However the difficulty in using HTML, CSS, and JS to create presentations is that they are limited by the difficulties inherent in the web platform, particularly with regard to style and functional encapsulation.  

Fortunately, an emerging specification called **Web Components** allows for the creation of custom HTML elements with their own unique logic (much like browser-makers' implementation of the complex `<video>` tag). The benefits of this new spec is that it allows the presentation logic to exist in a separate scope from the content, allowing the author to easily embed complex logic within slides without fear of conflict. Your presentation architecture will never be the same once you realize you can easily embed slide decks within individual slides (check out the [demo presentation](#) to see this in action).

Another advantage of using Web Components is that the PwrSlide tags have been created with their own set of custom methods and attributes, allowing them to be controlled by the user easily within the DOM: 

```javascript
// Transition to the next slide in the deck
document.querySelector('pwr-deck').nextSlide();

// Animate the current slide out
document.querySelector('pwr-deck').curSlide.animateOut();

// Transition to the fourth slide
document.querySelector('pwr-deck').current = 4;
```

**Web Components** are an exciting new phase in web design, and I would encourage those who are interested to watch [Eric Bidelman's presentation from Google I/O 2013](http://www.youtube.com/watch?v=fqULJBBEVQE) and to visit the [Polymer Project](http://polymer-project.org) website for futher information.

## Demo

> [Check it live](http://customelements.github.io/boilerplate-element).

## Usage

### Setup
To begin using PwrSlide in your website, you need to clone this repository into your `/vendor/` directory and then include the following in your document head:

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Project Title</title>

    <!-- Importing Polymer Polyfills -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/polymer/0.1.3/platform.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/polymer/0.1.3/polymer.js"></script>

    <!-- Importing PwrSlide Suite -->
    <link rel="import" href="vendor/PwrSlide/src/PwrSlide.html">

    ...

</head>
```

You will notice that the usual `<link>` tag, normally associated with `rel="stylesheet"`, is being used as an HTML import, a part of the Web Components spec that allows HTML code to be imported into another document. This enables HTML, CSS, and JavaScript to be packaged neatly together without requiring the loading of separate libraries. However, since this is a new spec and not fully implemented in all browsers, the Polymer polyfills must be included separately and prior to the HTML import in order for it to work in standard browsers. 

Exploring the `PwrSlide.html` file will reveal that the various components, stylesheets, fonts and themes have all been loaded within this HTML import. To add or remove elements from your project, simply edit this file to contain the resources you wish to include. By default, PwrSlide comes packaged with the three core web components required to build a presentation, the PwrSlide theme, and four custom theme fonts, and the [Google code prettifier](http://google-code-prettify.googlecode.com/svn/trunk/README.html).

### PwrSlide Components
PwrSlide was designed to be modular - you pick what you want and leave the rest behind. The core of the framework resides in the custom Web Components, which encapsulate the basic logic and styling of the presentation: 

<u>**Modules:**</u>   
- [PwrBase](#pwrbase)  
- [PwrAnimated](#pwranimated)  
<br>
<u>**Core Components:**</u>  
- [PwrDeck](#pwrdeck)  
- [PwrSlide](#pwrslide)  
- [PwrPiece](#pwrpiece)  

> **Note:** The PwrAnimated and PwrBase constructors are parent classes which serve as modules for the main core components and provide a number of utility methods; they should not be used as tags in your HTML.

### Basic Structure
The fundamental structure of a PwrSlide presentation consists of a `<pwr-deck>` containing any number of `<pwr-slide>` tags, each with their own content. To animate content within a slide, simply wrap it in `<pwr-piece>` tags. 
```
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

### Theming:  

In addition to the core components, PwrSlide includes an optional responsive theme complete with several slide color themes:

1) [Base Theme](#basetheme)  
2) [Theme Extensions](#themeextensions)  

Add some style to your deck with ease:

```
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
<br>
<hr>
# Components
## PwrBase
The PwrBase constructor is one of two super-classes implemented to provide utility methods to the PwrSlide core components (i.e. [PwrDeck](#pwrdeck), [PwrSlide](#pwrslide), and [PwrPiece](#pwrpiece)). All other elements extend the PwrBase constructor, so any methods or attributes added to this element will be usuable in all other PwrSlide components.

### Attributes
*None*

### Methods
Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`getParentDecks(i)`   | *integer*       | `[PwrDeck]`         | This is a utility method which can be useful when using animation callbacks (see [PwrAnimated](#pwranimated)) to manipulate the deck contents. The optional parameter `i` specifies the which parent deck to return (e.g. `getParentDecks(0)` will return the first ancestor deck, or `parentDecks[0]`); if left unspecified, an array of all ancestor PwrDeck nodes will be returned in order of closest ancestor.

> **Note:** The utility methods of PwrBase and PwrAnimated can be used on regular elements by calling them from the prototype.

## PwrAnimated
> **Inheritance:** [PwrBase](#pwrbase) > PwrAnimated

The PwrAnimated constructor is the parent class for all animated components in the PwrSlide core (i.e. [PwrSlide](#pwrslide) and [PwrPiece](#pwrpiece)), and as such, much of the power in PwrSlide <small>(bad pun)</small> resides therein. To truly leverage the flexibility of PwrSlide, a comprehensive understanding of this class is recommended.  

### Attributes

Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`entrance`      | *string*             | `""`          | This attribute specifies the keyframe name of the entrance animation of the slide. PwrSlide ships with the basic "fadeIn" and "fadeOut" animations standard, however you can define your own keyframes or load an animation library (like [Animate.css](https://daneden.me/animate/), which is packaged with the [PwrSlide Base Theme](#basetheme))
`exit`      | *string*             | `""`          | Similar to the `entrance` attribute, this specifies the keyframe name for the exit animation.
`onentry`      | *string*             | `""`          | Entrance animation callback. This attribute allows the user to specify JavaScript code to be executed **at the end** of the entrance animation. This attribute functions similarly to the `onclick` attribute in standard HTML. **Note:** For convenience, both entrance and exit callbacks are bound to the element on which they are called.
`onexit`      | *string*             | `""`          | Exit animation callback. Similar to `onentry`, this attribute allows the user to specify JavaScript code to be executed **at the start** of the exit animation. This attribute functions similarly to the `onclick` attribute in standard HTML. **Note:** For convenience, both entrance and exit callbacks are bound to the element on which they are called.

#### Animation Callbacks
Animation callbacks are one of the most powerful and useful features in PwrSlide, allowing you to execute code at a specific point in your deck and greatly expanding the flexibility of your presentation. The possible uses of this functionality are vast, ranging from making AJAX calls to external APIs for up-to-date data, to demonstrating time-sensitive code such as that of a JS video game.

Additionally, many of the utility methods provided by the PwrSlide super-classes have been designed with animation callbacks in mind. Because animation callbacks are bound, by default, to the object on which they are called, these utility methods can be used to manipulate several elements of your presentation at once:

```
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



## PwrDeck
> **Inheritance:** [PwrBase](#pwrbase) > PwrDeck

The PwrDeck object serves as the main container for your presentation deck, keeping track of all your slides and providing you with a number of methods to access them. A new deck is created by inserting the `<pwr-deck>` tags into your HTML and filling them with zero or more `<pwr-slide>` tags.

### Attributes
Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`unresolved`      | N/A                 | `""`               | This a polyfill attribute from the Polymer Library. It is **highly** recommended that you label your deck with the `unresolved` attribute to prevent a FOUC while the Web Components are loaded and registed in the DOM. The Polymer library will remove this attribute from the DOM at load time.
`current`      | *integer*                  | `1`               | Sets the value of the current slide being displayed by the deck. This attribute can be changed via JavaScript, causing the currently displayed slide to animate out and the new corresponding slide to be animated into the view. Setting this value in you HTML will dictate the starting slide in your presentation (useful for debugging specific slides).
`curSlide`      | *integer* 	   | `null`              | Returns the current `PwrSlide` object being displayed by the deck.
`controlsActive`   | *boolean*                     | `false`               | Toggles the keyboard controls for the deck. Actived by hovering over the deck you wish to control. **Note:** For nested decks within slides, hovering over the inner deck will deactivate the keyboard controls for the outer deck, allowing the user to switch through inner slides while remaining on the current outer slide.
`totalslides`   | *integer*                     | `0`               | Returns the total number of slides in the deck. Used for slide numbering in the base theme.
`slides`   | *NodeList*                     | `[]`               | Returns a NodeList (or an Array in polyfilled browsers) containing all of the PwrSlides objects within the given deck. **Note:** Changing the contents of the this attribute will alter the order of your presentation, do so with caution.

By default, the deck will load the slides in order of their declaration in the deck, however this can be changed by by setting the `current` attribute to a different value and/or changing the order of the `slides` NodeList:

```
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

### Methods
The PwrDeck object exposes several methods for the user to interact with, allowing slides to be changed on the fly using JavaScript:

Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`nextSlide()`   | N/A                     | N/A               | Animates the next `PwrPiece` or transitions to the next slide in order. This method is called on when `controlsActive=true` and the user presses right, down, space, or PgDwn. Fires a `slidechange` event.
`prevSlide()`   | N/A                     | N/A               | Transitions to the previous slide in order. This method is called on when `controlsActive=true` and the user presses left, up, or PgUp. Fires a `slidechange` event.
`getSlide(slideNum)`   | *integer*     | `PwrSlide`            | Returns the slide in the current deck corresponding to its index in the `slides` NodeList.

#### The `slidechange` Event
The `slidechange` event is fired when the currently displayed slide leaves the view and is replaced by another slide. The `event.details` contains an object representing the current state of the PwrDeck, namely the `slideIndex` and the `curSlide`. This event can be used to synchonize different decks, allowing you to queue presenter notes, trigger slide changes in other presentations, etc. 

## PwrSlide
> **Inheritance:** [PwrBase](#pwrbase) > [PwrAnimated](#pwranimated) > PwrSlide  

Here liveth your content! Whereas much of the internal logic resides within the PwrDeck object, the PwrSlide class is where much of the expressive power of this library can truly be leveraged.  

> **Note:** Much of the functionality of the PwrSlide class is inherited from the PwrAnimated constructor, [visit its section](#pwranimated) for more detailed descriptions.

### Attributes
Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`pieces`   | *NodeList*                | `[]`           | Returns a NodeList (or an Array in polyfilled browsers) containing all of the `<pwr-piece>` tags in descending order.
`entrance` | *string*                  | `"fadeIn"`          | **Inherited from [PwrAnimated](#pwranimated).** Specifies keyframe animation name for the slide entrance.
`exit` | *string*                  | `"fadeOut"`          | **Inherited from [PwrAnimated](#pwranimated).** Specifies keyframe animation name for the slide exit.
`onentry` | *string*                  | `""`          | **Inherited from [PwrAnimated](#pwranimated).** Entrance animation callback, this code is executed once the entrance animation is completed.
`onexit` | *string*                  | `""`          | **Inherited from [PwrAnimated](#pwranimated).** Exit animation callback, this code is executed when the exit animation begins.

### Methods
Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`animateNextPiece()`   | N/A            | `PwrPiece`               | Animates the next piece in or out when the `nextSlide()` keypress is triggered. Pieces with entrance animations are animated in in descending order. Once all pieces have been animated in, each piece with a exit animation defined is animated out in descending order. This method returns the animated `PwrPiece`.
`animatePiece(p, dir)`   | *integer* or *PwrPiece*, *string*   | `PwrPiece`          | This auxilary method can be used to animate a `PwrPiece` out of order. It takes an argument `p` which can be either the index of the piece in the `pieces` attribute or the `PwrPiece` itself, and an optional directional argument `dir` which specifies if you want the `PwrPiece` animated in or out (e.g. `animatePiece(2, "out")`). By default `dir="in"` unless the specified piece has already been animated in. This method returns the piece being animated. **Note:** if a piece is animated out of order, that animation will be skipped by the `animateNextPiece()` method.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)