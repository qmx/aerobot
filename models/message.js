module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Message", {
        network: DataTypes.STRING,
        channel: DataTypes.STRING,
        sender: DataTypes.STRING,
        recipient: DataTypes.STRING,
        message: DataTypes.TEXT
    }, {
        tableName: 'messages',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });
}