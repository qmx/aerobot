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
    }
});