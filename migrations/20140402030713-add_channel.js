module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('messages', 'channel', DataTypes.STRING).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropColumn('messages', 'channel').complete(done);
  }
}
