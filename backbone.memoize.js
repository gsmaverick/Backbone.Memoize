/**
 * Backbone.Memoize
 * https://github.com/gsmaverick/Backbone.Memoize
 *
 * Copyright (c) 2013 Gavin Schulz
 * Released under the MIT license
 */
(function(_, Backbone){
    'use strict';

    // Copied from Backbone Events implementation.
    var eventSplitter = /\s+/;

    var Model = Backbone.Model;

    Backbone.Model = Model.extend({
        _memoized: null,

        /**
         * Memoizes a function on the model, caching its value until the
         * underlying data has been changed.
         *
         * @param {Function} fn - The name of the function on this model that
         *     should be memoized.  The original definition of the function will
         *     be overwritten with the memoized version.
         * @param {String} props (Optional) - List of space-seperated property
         *     names that will scrub the current memoized value and recalculate
         *     the value on the next call of the function.  If not provided the
         *
         * @returns {Function} `fn` wrapped in a memoizer that should be called
         *     instead of the original function.
         */
        memoize: function(fn, props){
            if (!this._memoized) this._memoized = [];

            var self = this;

            this._memoized[fn] = {
                fresh: false,
                value: null
            };

            var evtString = 'change';

            if (eventSplitter.test(props)){
                var props = props.split(eventSplitter);

                evtString = 'change:' + props.join(' change:');
            }

            this.on(evtString, function(){
                this._memoized[fn].fresh = false;
            }, this);

            var func = this[fn];

            return function(){
                var cache = self._memoized[fn];

                if (!cache.fresh){
                    cache.fresh = true;
                    cache.value = func.apply(self);
                }

                return cache.value;
            };
        }
    });
})(_, Backbone);
