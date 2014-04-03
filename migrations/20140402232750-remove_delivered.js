module.exports = {
  up: function(migration, DataTypes, done) {
    migration.removeColumn('messages', 'delivered').complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.addColumn('messages', 'delivered', DataTypes.BOOLEAN).complete(done);
  }
}
