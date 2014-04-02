var util = require('../util');

module.exports = function(config, irc, bot, db, redis, from, to, message) {
    var key = "aerobot:factoid:" + config.irc.host + ":" + util.normalizeChannelName(to);
    if(bot.isFactoidStoreRequest(message)) {
        var storeRequest = bot.parseFactoidStoreRequest(message);
        redis.hset(key, storeRequest.key, storeRequest.value, function (err, reply) {
            irc.say(to, from + ': kk');
        });
    } else if(bot.isFactoidRemovalRequest(message)) {
        var removalRequest = bot.parseFactoidRemovalRequest(message);
        redis.hdel(key, removalRequest, function (err, reply) {
            irc.say(to, from + ': never heard of it!');
        });
    } else if(bot.isFactoidRetrievalRequest(message)) {
        var retrievalRequest = bot.parseFactoidRetrievalRequest(message);
        redis.hget(key, retrievalRequest, function (err, reply) {
            if(reply) {
                irc.say(to, from + ': ' + reply);
            } else {
                irc.say(to, from + ': wat?');
            }
        });
    } else if(bot.isFactoidRetrievalMentionRequest(message)) {
        var request = bot.parseFactoidMentionRequests(message);
        var factoidRequest = bot.parseFactoidRetrievalRequest(request.factoid);
        redis.hget(key, factoidRequest, function (err, reply) {
            if(reply) {
                irc.say(to, request.target + ': ' + reply);
            } else {
                irc.say(to, from + ': wat?');
            }
        });
    }
};
