<link href='http://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
<style type="text/css">
    h1 {
        text-align: center;
        font-family: "Pacifico", cursive;
    }
</style>
# PwrSlide

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

PwrSlide was designed to be modular - you pick what you want and leave the rest behind. The core of the framework resides in the custom Web Components, which encapsulate the basic logic and styling of the presentation. 

### Components:  

1) [PwrDeck](#pwrdeck)  
2) [PwrSlide](#pwrslide)  
3) [PwrPiece](#pwrpiece)  
<br>
4) [PwrAnimated](#pwranimated)  
5) [PwrBase](#pwrbase)  

> **Note:** The PwrAnimated and PwrBase objects are parent classes which serve as modules for the main core components and provide a number of utility methods; they should not be used as tags in your HTML.

#### Basic Structure
The fundamental structure of a PwrSlide presentation consists of a `<pwr-deck>` containing any number of `<pwr-slide>` tags, each with their own content. To animate content within a slide, simply wrap it in `<pwr-piece>` tags. 
```
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
```

### Theming:  

In addition to the core components, PwrSlide includes an optional responsive theme complete with several slide color themes:

6) [Base Theme](#basetheme)  
7) [Theme Extensions](#themeextensions)  

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

## PwrDeck
> PwrDeck extends [PwrBase](#pwrbase)

The PwrDeck object serves as the main container for your presentation deck, keeping track of all your slides and providing you with a number of methods to access them.

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
// Begin on the third slide
<pwr-deck current="3">

// Transition to the sixth slide
document.querySelector('pwr-deck').current = 6;

// Reverse the slide order
<script type="text/javascript">
    var slides = document.querySelector('pwr-deck').slides;
    slides = [].reverse.call(slides);
</script>

```

### Methods
Method  | Arguments                   | Return             | Description
---        | ---                       | ---                 | ---
`nextSlide()`   | N/A                     | N/A               | Animates the next `PwrPiece` or transitions to the next slide in order. This method is called on when `controlsActive=true` and the user presses right, down, space, or PgDwn. Fires a `slidechange` event.
`prevSlide()`   | N/A                     | N/A               | Transitions to the previous slide in order. This method is called on when `controlsActive=true` and the user presses left, up, or PgUp. Fires a `slidechange` event.
`getSlide(slideNum)`   | `slideNum:int`     | `PwrSlide`            | Returns the slide in the current deck corresponding to its index in the `slides` NodeList.

#### The `slidechange` Event

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)