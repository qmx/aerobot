var util = require('../util');
var moment = require('moment');

module.exports = function(config, irc, bot, db, redis, from, to, message) {
    if (bot.isMessageStoreRequest(message)) {
        var storeRequest = bot.parseMessageStoreRequest(message);
        if (storeRequest.recipient !== bot.nick) {
            db.Message.create({
                network: config.irc.host,
                channel: util.normalizeChannelName(to),
                recipient: storeRequest.recipient,
                message: storeRequest.message,
                sender: from
            }).complete(function(err, message) {
                irc.say(to, from + ": kk");
            });
        }
    } else if (bot.nick !== from) {
        db.Message.findAll({ where: {
            network: config.irc.host,
            channel: util.normalizeChannelName(to),
            recipient: from
        }}).complete(function(err, result) {
            result.forEach(function(m) {
                irc.say(to, "("+ moment(m.created_at).fromNow() + ") "+ m.sender + " => " + m.recipient + ": " + m.message);
                m.destroy();
            });
        });
    }
};