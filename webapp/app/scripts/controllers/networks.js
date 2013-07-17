App.NetworksController = Ember.ArrayController.extend({
    networks: Ember.ArrayProxy.create( { content: [] } )
});