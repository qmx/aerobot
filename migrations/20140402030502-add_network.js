module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('messages', 'network', DataTypes.STRING).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropColumn('messages', 'network').complete(done);
  }
}
