App.KarmaRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('model', App.Karma.find());
    }
});