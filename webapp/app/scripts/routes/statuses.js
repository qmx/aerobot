App.ChannelsStatusesRoute = Ember.Route.extend({
    setupController: function(controller, channelId) {
        var that = this;
        channelId = typeof channelId === "string" ? channelId : channelId.channel;
        this._super(controller);
        App.pipeline.pipes.networks.read({
            id: "irc.freenode.net/" + channelId,
            success: function(data) {
                var statuses = [];
                for ( var i = 0; i < data.users.length; i++ ) {
                    statuses.push( data.users[i].statuses[0].status );
                }
                that.controllerFor('statuses').set('statuses', statuses );
            }
        });
    }
});
