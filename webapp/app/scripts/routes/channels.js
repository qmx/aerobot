App.ChannelsRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('model', App.Channel.find());
    }
});