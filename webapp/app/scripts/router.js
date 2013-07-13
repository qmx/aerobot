App.Router.map(function () {
    this.resource('channels', function() {
        this.resource('users', { path: '/:id/users' }, function() {
            this.route('statuses', { path: '/:id/statuses' });
        });
        this.resource('karma');
    });
});
