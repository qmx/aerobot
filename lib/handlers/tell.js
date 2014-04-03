var util = require('../util');

module.exports = function(config, irc, bot, db, redis, from, to, message) {
    if (bot.isMessageStoreRequest(message)) {
        var storeRequest = bot.parseMessageStoreRequest(message);
        db.Message.create({
            network: config.irc.host,
            channel: util.normalizeChannelName(to),
            recipient: storeRequest.recipient,
            message: storeRequest.message,
            sender: from,
            delivered: false
        }).complete(function(err, message) {
            irc.say(to, from + ": kk");
        });
    }
};