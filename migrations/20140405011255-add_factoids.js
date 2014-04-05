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
                type: DataTypes.STRING,
                allowNull: false
            },
            channel: {
                type: DataTypes.STRING,
                allowNull: false
            },
            term: {
                type: DataTypes.STRING,
                allowNull: false
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
