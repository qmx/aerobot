App.Status = Ember.Object.extend();

App.Status.reopenClass({
    find: function( user_id ) {
        // If we've already loaded the list, return it
        //if (this._list) { return this._list; }

        // Remember what we've created so we don't request it twice.
        this._list = user_id === 1 ? [
                { id: 1, status: "test" }
            ] :
            [
                { id: 1, status: "test1" },
                { id: 2, status: "test2" }
            ];
        return this._list;
    }
});
