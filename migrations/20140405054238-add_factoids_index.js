module.exports = {
    up: function(migration, DataTypes, done) {
        migration.addIndex('factoids', ['network', 'channel', 'term'], {
            indicesType: 'UNIQUE'
        }).complete(done);
    },
    down: function(migration, DataTypes, done) {
        migration.removeIndex('factoids', ['network', 'channel', 'term']).complete(done);
    }
}
