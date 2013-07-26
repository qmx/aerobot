App.Router.map(function () {
    this.resource('builds');
    this.resource('statuses', function() {
        this.resource('network', { path: '/:network' }, function() {
            this.resource('channel', { path: '/:channel' } );
        });
    });
    this.resource('karma');
});
