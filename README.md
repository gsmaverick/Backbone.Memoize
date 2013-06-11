[travis-badge]: https://api.travis-ci.org/gsmaverick/Backbone.Memoize.png
[travis-link]: https://travis-ci.org/gsmaverick/Backbone.Memoize

# Backbone.Memoize [![Build Status][travis-badge]][travis-link]

Backbone.Memoize is a memoizer for functions on models or collections that intelligently recomputes cached values when the underlying model or collection changes.

**Dependencies:**

  - [Backbone](https://github.com/documentcloud/backbone) `>= 1.0.0`
  - [Underscore](https://github.com/documentcloud/underscore) `>= 1.4.4`

## Getting Started

Use Backbone.Memoize much like _.bind to wrap a function you want memoized.  By way of an example:
```js
var SimpleModel = Backbone.Model.extend({
    defaults: {
        name: null,
        brand: null
    },

    compoundName: function(){
        return this.get('brand') + ' ' + this.get('name');
    }
});
```
Then to memoize the function `compoundName` you have the following `initialize` function:
```js
initialize: function(){
    this.compoundName = this.memoize('compoundName');
}
```
The new `compoundName` function will be recomputed any time an attribute on the model is changed.  To restrict the recomputation to a subset of changed attributes provide a second argument which contains a space-seperated string that lists the properties that should cause a recomputation:
```js
initialize: function(){
    this.compoundName = this.memoize('compoundName', 'brand name');
}
```
Now the function will only be recomputed if the values of either `brand` or `name` are changed and will not recompute if the value of `year` is changed.

## Changelog
### 0.1.0
  - Initial release