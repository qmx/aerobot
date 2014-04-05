var util = require('../util');

module.exports = function(config, irc, bot, db, redis, from, to, message) {
    if(bot.isFactoidStoreRequest(message)) {
        var storeRequest = bot.parseFactoidStoreRequest(message);
        db.Factoid.findOrCreate({
            network: config.irc.host,
            channel: util.normalizeChannelName(to),
            term: storeRequest.key
        }, {
            meaning: storeRequest.value
        }).success(function(factoid, created) {
            if (!created) {
                factoid.meaning = storeRequest.value;
                factoid.save();
            }
            irc.say(to, from + ': kk');
        });
    } else if(bot.isFactoidRemovalRequest(message)) {
        var removalRequest = bot.parseFactoidRemovalRequest(message);
        db.Factoid.find({ where: {
            network: config.irc.host,
            channel: util.normalizeChannelName(to),
            term: removalRequest
        }}).success(function(factoid) {
            factoid.destroy();
            irc.say(to, from + ': never heard of it!');
        });
    } else if(bot.isFactoidRetrievalRequest(message)) {
        var retrievalRequest = bot.parseFactoidRetrievalRequest(message);
        db.Factoid.find({ where: {
            network: config.irc.host,
            channel: util.normalizeChannelName(to),
            term: retrievalRequest
        }}).success(function(factoid) {
            if(factoid) {
                irc.say(to, from + ': ' + factoid.meaning);
            } else {
                irc.say(to, from + ': wat?');
            }
        });
    } else if(bot.isFactoidRetrievalMentionRequest(message)) {
        var request = bot.parseFactoidMentionRequests(message);
        var factoidRequest = bot.parseFactoidRetrievalRequest(request.factoid);
        db.Factoid.find({ where: {
            network: config.irc.host,
            channel: util.normalizeChannelName(to),
            term: factoidRequest
        }}).success(function(factoid) {
            if(factoid) {
                irc.say(to, request.target + ': ' + factoid.meaning);
            } else {
                irc.say(to, from + ': wat?');
            }
        });
    }
};
