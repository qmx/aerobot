module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Karma", {
        network: DataTypes.STRING,
        channel: DataTypes.STRING,
        nick: DataTypes.STRING,
        score: DataTypes.INTEGER
    }, {
        tableName: 'karma',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });
}
