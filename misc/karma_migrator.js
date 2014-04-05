var util = require('./../lib/util');
var redis = require('redis');
var async = require('async');
if (process.env.REDIS_URL) {
    var redisURL = require('url').parse(process.env.REDIS_URL);
    var client = redis.createClient(redisURL.port, redisURL.hostname);
    client.auth(redisURL.auth.split(":")[1]);
} else {
    var client = redis.createClient();
}

var db = require('./../models');

// migrate karmas
function fetchKarmas(cb) {
    client.keys("aerobot:karma:*", function(err, reply) {
        async.reduce(reply, {}, function(memo, item, callback) {
            client.zrevrange(item, 0, -1, 'WITHSCORES', function(err, reply) {
                var scores = util.normalizeKarmaScores(reply);
                memo[item] = scores;
                callback(null, memo);
            });
        }, cb);
    });
}

fetchKarmas(function(err, result) {
    Object.getOwnPropertyNames(result).sort().forEach(function(item, i) {
        var parts = item.split(":");
        var network = parts[2];
        var channel = parts[3];
        Object.getOwnPropertyNames(result[item]).forEach(function(term) {
            var entry = result[item][term];
            if (entry.nick) {
                db.Karma.create({
                    network: network,
                    channel: channel,
                    nick: entry.nick,
                    score: entry.score
                });
            }
        });
    });
    client.quit();
});
