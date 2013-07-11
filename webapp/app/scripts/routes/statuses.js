App.UsersStatusesRoute = Ember.Route.extend({
    setupController: function(controller, user_id) {
        controller.set('model', App.Status.find(user_id));
    }
});
