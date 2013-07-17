App.ChannelsRoute = Ember.Route.extend({
    setupController: function(controller, network) {
        var that = this;
        network = typeof network === "string" ? network : network.network;
        this._super(controller);
        App.pipeline.pipes.networks.read({
            success: function(data) {
                that.controllerFor('channels').set('channels', data["aerobot:status"][network].channels).set('network', network);
            }
        });
    }
});
