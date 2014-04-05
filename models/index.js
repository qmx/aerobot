if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize'),
    sequelize = null;

    var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
        dialect:  'postgres',
        protocol: 'postgres',
        port:     match[4],
        host:     match[3],
        logging:  true //false
    });

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        Message: sequelize.import(__dirname + '/message'),
        Factoid: sequelize.import(__dirname + '/factoid')
    }
}

module.exports = global.db;