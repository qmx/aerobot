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

module.exports = function(config, irc, bot, db, from, to, message) {
    if(bot.isKarmaRequest(message)) {
        var req = bot.parseKarmaRequest(message);
        if (bot.isValidKarmaRequest(from, req)) {
            for (var i = 0; i < req.length; i++) {
                var request = req[i];
                db.Karma.findOrCreate({
                    network: config.irc.host,
                    channel: util.normalizeChannelName(to),
                    nick: request.user
                }).success(function(user, created) {
                    var actionText = request.direction === 1 ? 'gained' : 'lost';
                    if (request.direction === 1) {
                        user.increment('score', { by: 1 }).success(function(u) {
                            irc.say(to, u.nick + ' ' + actionText + ' a level! (Karma: ' + u.score + ')');
                        });
                    } else {
                        user.decrement('score', { by: 1 }).success(function(u) {
                            irc.say(to, u.nick + ' ' + actionText + ' a level! (Karma: ' + u.score + ')');
                        });
                    }
                });
            }
        }
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