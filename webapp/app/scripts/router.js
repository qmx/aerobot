App.Router.map(function () {
    this.resource('networks', function() {
        this.resource('channels', { path: '/:network/channels' }, function() {
            this.route('statuses', { path: '/:channel/statuses' } );
        });
    });
});
