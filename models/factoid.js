module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Factoid", {
        network: DataTypes.STRING,
        channel: DataTypes.STRING,
        term: DataTypes.STRING,
        meaning: DataTypes.STRING
    }, {
        tableName: 'factoids',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });
}
