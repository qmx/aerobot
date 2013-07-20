App.StatusesRoute = Ember.Route.extend({
    setupController: function(controller, channelId) {
        var that = this;
        App.pipeline.pipes.statuses.read({
            success: function(data) {
                that.controllerFor('statuses').set('networks', data['aerobot:status'].networks);
            }
        });
    }
});
