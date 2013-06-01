/**
 * Backbone.Memoize
 * https://github.com/gsmaverick/Backbone.Memoize
 *
 * Copyright (c) 2013 Gavin Schulz
 * Released under the MIT license
 */
(function(_, Backbone){
    'use strict';

    var Model = Backbone.Model;

    Backbone.Model = Model.extend({
        _memoized: null,

        memoize: function(fn){
            if (!this._memoized) this._memoized = [];

            var self = this;

            this._memoized[fn] = {
                fresh: false,
                value: null
            };

            this.on('change', function(){
                this._memoized[fn].fresh = false;
            }, this);

            return function(){
                var func = self._memoized[fn];

                if (!func.fresh){
                    func.fresh = true;
                    func.value = fn.apply(self);
                }

                return func.value;
            };
        }
    });
})(_, Backbone);
