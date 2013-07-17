App.ChannelsController = Ember.ArrayController.extend({
    channels: Ember.ArrayProxy.create( { content: [] } )
});