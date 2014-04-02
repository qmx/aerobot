var irc = require('irc');
var Bot = require('./lib/bot').Bot;
var util = require('./lib/util');
var redis = require('redis');
var _ = require('lodash');
var requireDir = require('require-dir');
var handlers = requireDir('./lib/handlers');
var db = require('./models');
if (process.env.REDIS_URL) {
    var redisURL = require('url').parse(process.env.REDIS_URL);
    var client = redis.createClient(redisURL.port, redisURL.hostname);
    client.auth(redisURL.auth.split(":")[1]);
} else {
    var client = redis.createClient();
}

if (process.env.AEROBOT_CONFIG) {
    var config = JSON.parse(process.env.AEROBOT_CONFIG);
} else {
    var config = {
        irc:{
            host:'irc.freenode.net',
            nick:'aerobot_qmx',
            channels: ['#aerobot-test']
        }
    };
}

var ircConnection  = new irc.Client(config.irc.host, config.irc.nick, {
    channels: config.irc.channels
});

var bot = new Bot(config.irc.nick);

ircConnection.addListener('message', function (from, to, message) {
    for (var handler in handlers) {
        handlers[handler](config, ircConnection, bot, client, from, to, message);
    }
});
