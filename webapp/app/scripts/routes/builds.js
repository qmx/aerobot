App.BuildsRoute = Ember.Route.extend({
    setupController: function(controller) {
        var that = this;
        App.buildsPipeline.pipes.builds.read({
            success: function(data) {
                that.controllerFor('builds').set('repositories', data['repositories']);
            }
        });
    }
});