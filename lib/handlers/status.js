var util = require('../util');

module.exports = function(config, irc, bot, db, redis, from, to, message) {
    if(bot.isStatusMessage(message)) {
        db.Status.create({
            network: config.irc.host,
            channel: util.normalizeChannelName(to),
            nick: from,
            log: bot.normalizeStatusMessage(message)
        }).success(function(st) {
            irc.say(to, from + ': recorded your slacking at <dashboard link coming soon>');
        });
    }
};
