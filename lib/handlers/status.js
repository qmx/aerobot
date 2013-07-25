var util = require('../util');

module.exports = function(config, irc, bot, redis, from, to, message) {
    var key = "aerobot:status:" + config.irc.host + ":" + util.normalizeChannelName(to) + ":" + from;
    if(bot.isStatusMessage(message)) {
        redis.hset(key, new Date().toISOString(), bot.normalizeMessage(message), function (err, reply){
            irc.say(to, from + ': recorded your slacking at <dashboard link coming soon>');
        });
    }
};
