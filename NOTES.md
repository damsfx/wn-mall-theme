# Notes for futur improvements

There is scope for improvements to enhance accessibility and better support for HTML features.
> ⚠️ These changes may involve or require modifications to the plugin's components partials, and could therefore potentially cause a **breaking change**.


## General

### Signin form & checkout forms

Currently, shipping addresses are displayed when a checkbox is clicked using JavaScript; this can be achieved using only CSS: `:has([name="use_different_shipping"]:checked)`.

✅ Done in new CSS files

### Hard coded styles

Some elements have hardcoded styles in component's partial :
 - `.mall-shipping-address`

## Product page

### Wish List button

Currently, the button shows or hides a pseudo-popup positioned, using JavaScript.\
It is possible to use native HTML/CSS functions with `<dialog />` elements to create a modal window.

## QuickCheckout page

### Quickcheckout's collapsible elements

Currently, the quickcheckout's collapsible elements are show/hide using Javascript.\
It is possible tu use native `<summary />` + `<detail/>` HTML elements to reproduce the behavior.
