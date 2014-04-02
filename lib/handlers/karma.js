var util = require('../util');

module.exports = function(config, irc, bot, db, redis, from, to, message) {
    var key = "aerobot:karma:" + config.irc.host + ":" + util.normalizeChannelName(to);
    if(bot.isKarmaRequest(message)) {
        var request = bot.parseKarmaRequest(message);
        redis.zincrby(key, request.direction, request.user, function (err, reply) {
            var actionText = request.direction === 1 ? 'gained' : 'lost';
            irc.say(to, request.user + ' ' + actionText + ' a level! (Karma: ' + reply + ')');
        });
    } else if (bot.isKarmaBestRequest(message)) {
        redis.zrevrange(key, 0, 4, 'WITHSCORES', function(err, reply) {
            if (!err) {
                var scores = util.normalizeKarmaScores(reply);
                irc.say(to, util.prettyPrintKarmaScores(scores));
            }
        });
    } else if (bot.isKarmaWorstRequest(message)) {
        redis.zrange(key, 0, 4, 'WITHSCORES', function(err, reply) {
            if (!err) {
                var scores = util.normalizeKarmaScores(reply);
                irc.say(to, util.prettyPrintKarmaScores(scores));
            }
        });
    }
};