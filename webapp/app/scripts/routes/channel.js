App.ChannelRoute = Ember.Route.extend({
    setupController: function(controller, channel) {
        var that = this;
        App.pipeline.pipes.statuses.read({
            id: 'irc.freenode.net/' + channel.channel,
            success: function(data) {
                that.controllerFor('channel').set('users', data.users);
            }
        });
    }
});
