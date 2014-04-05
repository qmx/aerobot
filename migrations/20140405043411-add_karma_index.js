module.exports = {
    up: function(migration, DataTypes, done) {
        migration.addIndex('karma', ['network', 'channel', 'nick'], {
            indicesType: 'UNIQUE'
        }).complete(done);
    },
    down: function(migration, DataTypes, done) {
        migration.removeIndex('karma', ['network', 'channel', 'nick']).complete(done);
    }
}
