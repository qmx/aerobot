var jerk = require('jerk'),
repl = require('repl');
var options = {
    server: 'irc.freenode.net',
    nick: 'aerobot2'
};
var bot = jerk(function (j) {
    j.watch_for(new RegExp('^('+options.nick+'):\s*(.+)') , function (message) {
        console.log(message.user +' => '+message.match_data[2]);
        message.say(message.user +': recorded');
    });
}).connect(options);

var local = repl.start('>');
local.context.bot = bot;