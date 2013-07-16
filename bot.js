var irc = require('irc');
var Bot = require('./lib/bot').Bot;
var redis = require('redis');

if (process.env.REDIS_URL) {
    var redisURL = require('url').parse(process.env.REDIS_URL);
    var client = redis.createClient(redisURL.port, redisURL.hostname);
    client.auth(redisURL.auth.split(":")[1]);
} else {
    var client = redis.createClient();
}

var options = {
    host:'irc.freenode.net',
    nick:'aerobot2',
    channels:['#aerobot-test']
};

var ircConnection  = new irc.Client(options.host, options.nick, {
    channels: options.channels
});

var bot = new Bot(options.nick);
ircConnection.addListener('message', function (from, to, message) {
    if(bot.isStatusMessage(message)) {
        var key = "aerobot:status:" + options.host + ":" + to + ":" + from;
        client.hset(key, new Date().toISOString(), bot.normalizeMessage(message), function (err, reply){
            ircConnection.say(to, from + ': recorded your slacking at <dashboard link coming soon>');
        });
    } else if(bot.isFactoidStoreRequest(message)) {
        var key = "aerobot:factoids:" + options.host + ":" + to;
        var request = bot.parseFactoidStoreRequest(message);
        client.hset(key, request.key, request.value, function (err, reply) {
            ircConnection.say(to, from + ': kk');
        });
    } else if(bot.isFactoidRemovalRequest(message)) {
        var key = "aerobot:factoids:" + options.host + ":" + to;
        var request = bot.parseFactoidRemovalRequest(message);
        client.hdel(key, request, function (err, reply) {
            ircConnection.say(to, from + ': never heard of it!');
        });
    }
});