App.Karma = Ember.Object.extend();

App.Karma.reopenClass({
    karmaPipe: AeroGear.Pipeline({
        name: "karma",
        recordId: "nick",
        settings: {
            baseURL: "http://localhost:3000/api/"
        }
    }).pipes.karma,

    find: function() {
        var karma = Ember.ArrayProxy.create({ content: [] });
        this.karmaPipe.read({
            success: function( data ) {
                data.forEach( function( item ) {
                    karma.pushObject( App.Karma.create( item ) );
                });
            }
        });

        return karma;
    }
});
