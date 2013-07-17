App.NetworksRoute = Ember.Route.extend({
    setupController: function(controller) {
        var that = this;
        this._super(controller);
        App.pipeline.pipes.networks.read({
            success: function(data) {
                var networks = Object.keys(data["aerobot:status"]);
                that.controllerFor('networks').set('networks', networks);
            }
        });
    }
});
