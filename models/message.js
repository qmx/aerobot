module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Message", {
        sender: DataTypes.STRING,
        recipient: DataTypes.STRING,
        message: DataTypes.TEXT,
        delivered: DataTypes.BOOLEAN
    }, {
        tableName: 'messages'
    });
}