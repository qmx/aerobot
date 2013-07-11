App.User = Ember.Object.extend();

App.User.reopenClass({
    find: function( channel_id ) {
        // If we've already loaded the list, return it
        if (this._list) { return this._list; }

        // Remember what we've created so we don't request it twice.
        this._list = [
            {
                id: 1,
                name: "qmx",
                statuses: [
                    { id: 1, status: "test" }
                ]
            },
            {
                id: 2,
                name: "kborchers",
                statuses: [
                    { id: 1, status: "test1" },
                    { id: 2, status: "test2" }
                ]
            }
        ];
        return this._list;
    }
});
