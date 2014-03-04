# Theming

In addition to the [core components](../README.md), PwrSlide also ships with a standard template to give the user tools to start building presentations quickly without the hassle of configuring slide layouts and styles. In an effort to streamline the customization process, the PwrSlide theme has been built using [Sass](http://sass-lang.com) and [Bourbon](http://bourbon.io) and organized to be as modular as possible, thus allowing you to easily add or remove elements from the theme as you see fit.

## Organization
The PwrSlide theme has been divided into a [base theme](#base-theme) and a number of [theme extensions](#theme-extensions). Within the `theme/` directory, the various elements of the PwrSlide theme have been organized as such:

- The `theme.scss` file is where the user can exercise control over which elements of the theme to include in their project.
- `_base.scss` contains the [base theme](#base-theme): basic slide layouts, media queries, and the css reset file. It also contains the `_variables.scss` file (see below).
- `_variables.scss` is a list of all variables used in the base theme. The entire PwrSlide theme has been designed to allow for easy customization by the user, utilizing Sass variables to quickly and easily edit the appearance of the theme without the hassle of editing raw css. Change the `_variables.scss` file to alter the look and feel of your presentation as you see fit.
- The `slide-themes/` directory contains a set of color themes that can be applied to any of the layouts in the base theme. Each color theme is organized similarly to the base theme, with a set of variables included in each theme to allow for easy customization. The name of each color theme corresponds to the class that can be applied to a given slide to give it that color theme (e.g. `_red.scss` contains the theme applied when the `.red` class is added to a slide)

### Customizing Your Theme
With the exception of [PrettyPrint](#prettyprint), the user can customize their theme build by editing the `theme.scss` file to include the elements they wish. By default, the PwrSlide theme contains the [base theme](#base-theme), six [custom color themes](#custom-themes), and the [custom animations](#custom-animations) keyframe definitions.

## Base Theme
The base theme is contained within the `theme/resources/_base.scss` file and comprises base styles for each PwrSlide component and several basic responsive layouts designed to be easily edited and augmented by the user. Currently the base theme supports the following layouts:

- [Title Slide](#title-slide)
- [Centered Column](#centered-column)
- [Two Column](#two-column)
- [Segue Slide](#segue-slide)

In addition, the base theme also includes the following utility layouts to aid the user with more complex designs and effects:

- [Animated Slide](#animated-slide)
- [Inner Deck](#inner-deck)
- [Blank Slide](#blank-slide)


### Title Slide
```html
<!-- Basic .title-slide Layout -->
<pwr-slide class="title-slide">
  <header>
    <h1>Top Level Header</h1>
    <h2>Subheader</h2>
    <h3>Byline</h3>
  </header>
  <aside class="tip">Optional tooltip</aside>
</pwr-slide>
```

The `.title-slide` layout allows for a three-line header, optional tooltip and support for a title icon. Save your title icon in the `images/` directory as `title-icon.png` for it to appear the PwrSlide `:after` pseudo element.

##### Custom Animation Effects
In addition to the standard in-slide animations included in the [Animated class](#animated-slide), adding the `.animated` class will cause the title icon to spin after a short delay and the tooltip to flash slowly.


### Centered Column
```html
<!-- Basic .centered-column Layout -->
<pwr-slide class="centered-column">
  <header>
    <h1>Slide Title</h1>
    <h2>Subheading</h2>
  </header>
  <section>
    <header>Optional Section Header</header>
    <!-- content here -->
  </section>
</pwr-slide>
``` 
The `.centered-column` layout is a standard single column layout which is centered horizontally and vertically using the (new) flexbox spec. It supports a two-level header and a single section of content with an optional header.

### Two Column
```html
<!-- Basic .two-column Layout -->
<pwr-slide class="two-column">
  <header>
    <h1>Slide Title</h1>
    <h2>Subheading</h2>
  </header>

  <section>
    <header>Optional Section Header</header>
    <!-- Left column content here -->
  </section>

  <section>
    <header>Another Optional Section Header</header>
    <!-- Right column content here -->
  </section>
</pwr-slide>
``` 
The `.two-column` layout is a standard two-column layout implemented using floats rather than flexbox for positioning due to cross-browser inconsistencies. It supports a two-level slide header and a two sections of content, each with an optional header.

### Segue Slide
```html
<!-- Basic .segue-slide Layout -->
<pwr-slide class="segue-slide">
  <header>
    <h1>Segue Title</h1>
    <h2>Subheading</h2>
  </header>
</pwr-slide>
```
The `.segue-slide` layout allows for a two-line header and support for a segue icon. Save your title icon in the `images/` directory as `segue-icon.png` for it to appear the PwrSlide `:before` pseudo element.

##### Custom Animation Effects
Similar to the `.title-slide`, in addition to the standard in-slide animations included in the [Animated class](#animated-slide), adding the `.animated` class will cause the segue icon to spin after a short delay.

### Animated Slide
Adding the `.animated` class to any slide will add a little extra visual flourish to your slide. In addition to any custom animation effects mentioned previously, this class will cause your slide heading to bounce happily up and down and your subheading to slide in casually after a slight delay.

### Inner Deck
The `.inner-deck` utility class is designed to allow the user to utilize one of one of the main advantages of Web Components, namely their ability to encapsulate style and function. The `.inner-deck` class may be applied to a PwrDeck element that you wish to embed within a given slide, allowing you to nest a presentation within a presentation (within a presentation, within a presentation); it's like presentation inception!

**Example:**  

```html
<pwr-slide class="two-column">
  ...
  <!-- Some bullets in the left column -->
  <section>
    <ul>
      <li>...</li>
      <li>...</li>
      <li>...</li>
    </ul>
  </section>

  <!-- A nested .inner deck in the rigth column -->
  <section>
    <pwr-deck class="inner-deck">
      <pwr-slide>...</pwr-slide>
      <pwr-slide>...</pwr-slide>
      <pwr-slide>...</pwr-slide>
    </pwr-deck>
  </section>
</pwr-slide>
```
> **Note:** The slide layouts described previously have been designed to scale for large-size decks. Although they will generally still work within an `.inner-deck`, a certain degree of customization may still be necessary.


### Blank Slide
The `.blank` utility class has been added to allow the user to remove all default styles from the PwrSlide element, allowing you to create your own custom slide layouts if you so choose. Additionally, a `@blank-slide()` Sass mixin has also been provided in `_variables.scss` in the event that you choose to add a custom slide layout to the base theme and wish to remove the default PwrSlide styles.

### A Couple Thoughts on Workflow
For those looking to increase their productivity using PwrSlide, I would highly recommend using the [Emmet toolkit](http://emmet.io) to streamline your coding. For those unfamiliar with Emmet, it allows web developers to use CSS selectors in lieu of fully typing out HTML tags, you can check out their website for more details. 

Once you have installed Emmet, you can add a couple of custom snippets to handle formatting the basic structure of various slide layouts, ensuring that you have the proper syntax for each layout. As an example, this addition to the `Emmet.sublime-settings` will give the following abbreviations:

```html
"snippets": {
  "html": {
    "abbreviations": {
      "ps:2col": "pwr-slide.two-column>(header>h1+h2)+(section)*2",
      "ps:1col": "pwr-slide.centered-column>(header>h1+h2)+section",
      "ps:title": "pwr-slide.title-slide>(header>h1+h2+h3)+aside.tip",
      "ps:segue": "pwr-slide.segue-slide>header>h1+h2"
    }
  }
},
```

## Theme Extensions
In addition to the [base theme](#base-theme), PwrSlide also includes a number of theme extensions to add color and style to your presentations. These extensions include:

- [PrettyPrint code highlighting](#prettyprint) (courtesy of Google)
- [Custom animation keyframes](#custom-animations) (courtesy of [Animate.css](https://daneden.me/animate/) and yours truly)
- [Custom color themes](#custom-themes)

### PrettyPrint
The [PrettyPrint library](http://google-code-prettify.googlecode.com/svn/trunk/README.html) provided by Google has been included in this project for the benefit of those wishing to demonstrate code within their presentations. However, due to this library's dependency on JavaScript, it has been packaged in the `src/PwrSlide.html` configuration file, rather than in the `theme.scss` stylesheet. 

To include a snippet of custom code in your presentation, simply wrap the code in `<pre>` tags and specify the language in the `data-lang` attribute as shown:

```html
<pre class="prettyprint" data-lang="javascript">
&lt;script type='text/javascript'&gt;
  function helloWorld(world) {
    <b>for (var i = 0; ++i &lt; 42;) {
      console.log('Hello ' + String(world));
    }</b>
  }
&lt;/script&gt;
</pre>
```
> **Note:** Notice that raw HTML must be properly escaped to ensure that it renders properly within the code block. Additionally, `prettyPrint()` parses all whitespace literally, so your code must begin at the leftmost column of your code to ensure proper indentation. As a final note, the user must also call `prettyPrint()` manually in order for the code to render in the highlighted format. This can be easily accomplished via an animation callback or immediately when the document loads.

### Custom Animations
The `_animations.scss` file contains a number of additional animation keyframes from the Animate.css library. If you wish to add your own custom animations, you can define the corresponding keyframes here. Any animation defined here can be used by any instance of the PwrAnimated class or its descendants. 

> **Note:** Unlike Animate.css, the `_animations.scss` file does not include any corresponding classes to apply these animations to a given element. The animation names must be specified in the `exit` and `entrance` attributes of the PwrAnimated class.

### Custom Themes
The `slide-themes/` directory contains a number of custom color themes which can be applied to any slide to add a splash of variety and style. By default, PwrSlide is packaged with six of these color theme classes: `.red`, `.blue`, `.green`, `.gold`, `.black`, and `.salmon`. Each of these classes is defined in the corresponding `_COLOR.scss` file within the `slide-themes/` directory and formatted in much the same manner as the [base theme](#base-theme), with a set of variables at the top of each stylesheet to allow for quick and easy customization. 

In addition to the six default color themes, an additional `_custom-theme.scss` boilerplate file has been included to allow the user to easily add their own color theme if they so choose. 

> **Note:** Each of the default color themes support the various slide layouts included in the PwrSlide [base theme](#base-theme). In the event that the user chooses to add their own custom layout, or alters the base theme, the custom color themes will also need to be edited to support these changes.
