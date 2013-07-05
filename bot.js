var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'aerobot2', {
    channels: ['#aerobot-test']
});

client.addListener('message', function (from, to, message) {
    console.log("%s %s %s %s", new Date().toISOString(), from, to, message);
});