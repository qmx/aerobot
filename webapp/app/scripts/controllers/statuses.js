App.StatusesController = Ember.ArrayController.extend({
    statuses: Ember.ArrayProxy.create( { content: [] } )
});