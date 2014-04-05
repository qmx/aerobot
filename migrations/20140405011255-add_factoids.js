module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable('factoids', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            },
            network: {
                type: DataTypes.STRING
            },
            channel: {
                type: DataTypes.STRING
            },
            term: {
                type: DataTypes.STRING
            },
            meaning: {
                type: DataTypes.STRING
            }
        }).complete(done);
    },
    down: function(migration, DataTypes, done) {
        migration.dropTable('factoids').complete(done);
    }
}
