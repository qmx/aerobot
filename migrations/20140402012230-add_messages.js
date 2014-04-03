module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('messages', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        sender: {
            type: DataTypes.STRING
        },
        recipient: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.TEXT
        },
        delivered: {
            type: DataTypes.BOOLEAN
        }
    }).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('messages').complete(done);
  }
}
