App.UsersRoute = Ember.Route.extend({
    setupController: function(controller, channel_id) {
        controller.set('model', App.User.find(channel_id));
    }
});
