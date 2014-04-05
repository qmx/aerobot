module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable('karma', {
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
            nick: {
                type: DataTypes.STRING,
                allowNull: false
            },
            score: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            }
        }).complete(done);
    },
    down: function(migration, DataTypes, done) {
        migration.dropTable('karma').complete(done);
    }
}
