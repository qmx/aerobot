module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Status", {
        network: DataTypes.STRING,
        channel: DataTypes.STRING,
        nick: DataTypes.STRING,
        log: DataTypes.STRING
    }, {
        tableName: 'statuses',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });
}
