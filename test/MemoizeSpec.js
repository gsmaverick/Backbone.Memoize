describe('Backbone.Memoize', function(){
    describe('Simple Model', function(){
        var SimpleModel = Backbone.Model.extend({
            defaults: {
                name: null,
                brand: null,
                year: null
            },

            initialize: function(){
                this.compoundName = this.memoize('compoundName');
            },

            compoundName: function(){
                return this.get('brand') + ' ' + this.get('name');
            }
        });

        var model;

        beforeEach(function(){
            model = new SimpleModel({
                name: 'Prius',
                brand: 'Toyota',
                year: '2010'
            });
        });

        it('should return the correct value', function(){
            expect(model.compoundName()).toEqual('Toyota Prius');
        });

        it('should not get property values more than once', function(){
            spyOn(model, 'get').andCallThrough();

            var name = model.compoundName();

            expect(model.get.callCount).toEqual(2);

            expect(model.compoundName()).toEqual(name);
            expect(model.get.callCount).toEqual(2);
        });

        it('should update value when any model attributes change', function(){
            spyOn(model, 'get').andCallThrough();

            var name = model.compoundName();

            expect(model.get.callCount).toEqual(2);

            model.set('year', '2011');

            expect(model.compoundName()).toEqual(name);
            expect(model.get.callCount).toEqual(4);

            model.set('brand', 'GM');

            expect(model.compoundName()).toEqual('GM Prius');
            expect(model.get.callCount).toEqual(6);
        });
    }); // describe('Simple Model')

    describe('Complex Model', function(){
        var ComplexModel = Backbone.Model.extend({
            defaults: {
                name: null,
                brand: null,
                year: null
            },

            initialize: function(){
                this.compoundName = this.memoize('compoundName', 'name brand');
            },

            compoundName: function(){
                return this.get('brand') + ' ' + this.get('name');
            }
        });

        var model;

        beforeEach(function(){
            model = new ComplexModel({
                name: 'Prius',
                brand: 'Toyota',
                year: '2010'
            });
        });

        it('should return the correct value', function(){
            expect(model.compoundName()).toEqual('Toyota Prius');
        });

        it('should not get property values more than once', function(){
            spyOn(model, 'get').andCallThrough();

            var name = model.compoundName();

            expect(model.get.callCount).toEqual(2);

            expect(model.compoundName()).toEqual(name);
            expect(model.get.callCount).toEqual(2);
        });

        it('should update value only when specified attrs change', function(){
            spyOn(model, 'get').andCallThrough();

            var name = model.compoundName();

            expect(model.get.callCount).toEqual(2);

            model.set('year', '2011');

            expect(model.compoundName()).toEqual(name);
            expect(model.get.callCount).toEqual(2);

            model.set('brand', 'GM');

            expect(model.compoundName()).toEqual('GM Prius');
            expect(model.get.callCount).toEqual(4);
        });
    }); // describe('Complex Model')
}); // describe('Backbone.Memoize')