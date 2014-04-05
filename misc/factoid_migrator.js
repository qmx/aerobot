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

// migrate factoids
function fetchFactoids(cb) {
    client.keys("aerobot:factoid:*", function (err, reply) {
        async.reduce(reply, {}, function(memo, item, callback) {
            client.hgetall(item, function(err, reply) {
                memo[item] = reply;
                callback(null, memo);
            });
        }, cb);
    });
}
fetchFactoids(function(err, result) {
    Object.getOwnPropertyNames(result).sort().forEach(function(item, i) {
        var parts = item.split(":");
        var network = parts[2];
        var channel = parts[3];
        Object.getOwnPropertyNames(result[item]).forEach(function(term) {
            db.Factoid.create({
                network: network,
                channel: channel,
                term: term,
                meaning: result[item][term]
            });
        });
    });
    client.quit();
});
