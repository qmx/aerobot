module.exports = {
  up: function(migration, DataTypes, done) {
    migration.renameColumn('messages', 'createdAt', 'created_at');
    migration.renameColumn('messages', 'updatedAt', 'updated_at');
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.renameColumn('messages', 'created_at', 'createdAt');
    migration.renameColumn('messages', 'updated_at', 'updatedAt');
    done()
  }
}
