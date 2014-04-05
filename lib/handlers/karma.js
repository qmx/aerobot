var util = require('../util');

function queryForKarma(db, network, channel, ordering, cb) {
    db.Karma.findAll({
        where: {
            network: network,
            channel: channel
        },
        limit: 5,
        order: [
            ['score', ordering]
        ],
        attributes: ['id', 'nick', 'score']
    }).complete(cb);
}

module.exports = function(config, irc, bot, db, redis, from, to, message) {
    var key = "aerobot:karma:" + config.irc.host + ":" + util.normalizeChannelName(to);
    if(bot.isKarmaRequest(message)) {
        var request = bot.parseKarmaRequest(message);
        db.Karma.findOrCreate({
            network: config.irc.host,
            channel: util.normalizeChannelName(to),
            nick: request.user
        }).success(function(user, created) {
            var actionText = request.direction === 1 ? 'gained' : 'lost';
            if (request.direction === 1) {
                user.increment('score', { by: 1 }).success(function(u) {
                    irc.say(to, request.user + ' ' + actionText + ' a level! (Karma: ' + u.score + ')');
                });
            } else {
                user.decrement('score', { by: 1 }).success(function(u) {
                    irc.say(to, request.user + ' ' + actionText + ' a level! (Karma: ' + u.score + ')');
                });
            }
        });
    } else if (bot.isKarmaBestRequest(message)) {
        queryForKarma(db, config.irc.host, util.normalizeChannelName(to), 'DESC', function(err, scores) {
            irc.say(to, util.prettyPrintKarmaScores(scores));
        });
    } else if (bot.isKarmaWorstRequest(message)) {
        queryForKarma(db, config.irc.host, util.normalizeChannelName(to), 'ASC', function(err, scores) {
            irc.say(to, util.prettyPrintKarmaScores(scores));
        });
    }
};