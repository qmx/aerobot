var express = require('express'),
http = require('http'),
path = require('path'),
cors = require('cors'),
async = require('async'),
redis = require('redis'),
_ = require('lodash'),
util = require('./lib/util');

if (process.env.REDIS_URL) {
    var redisURL = require('url').parse(process.env.REDIS_URL);
    var client = redis.createClient(redisURL.port, redisURL.hostname);
    client.auth(redisURL.auth.split(":")[1]);
} else {
    var client = redis.createClient();
}
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.end("get outta here");
});

function fetchStatuses(cb) {
    client.keys("aerobot:status:*", function (err, reply) {
        async.reduce(reply, {}, function(memo, item, callback) {
            client.hgetall(item, function(err, reply) {
                memo[item] = reply;
                callback(null, memo);
            });
        }, cb);
    });
}

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

app.get('/statuses', function (req, res) {
    fetchStatuses(function(error, result) {
        res.json(util.parseStatuses(result));
    });
});

app.get('/statuses/:network', function (req, res) {
    var network = req.params.network;
    var searchKey = "aerobot:status:" + network + ":*";
    var result = {network:network, channels:[]};
    client.keys(searchKey, function (err, reply) {
        for(var i = 0; i < reply.length; i++){
            var channel = util.parseRedisStatusKey(reply[i]).channel;
            result.channels.push({channel:channel});
        }
        result.channels = _.uniq(result.channels, 'channel');
        res.json(result);
    });
});

app.get('/statuses/:network/:channel', function (req, res) {
    var network = req.params.network;
    var channel = req.params.channel;
    var searchKey = "aerobot:status:" + network + ":" + channel + ":*";
    client.keys(searchKey, function (err, reply) {
        async.reduce(reply, {channel:channel, users:[]}, function(memo, item, callback) {
            var userName = util.parseRedisStatusKey(item).user;
            client.hgetall(item, function (err, statuses) {
                var user = {user:userName, statuses:[]};
                var unsortedStatuses = [];
                for (var timestamp in statuses) {
                    unsortedStatuses.push({timestamp:timestamp, status:statuses[timestamp]});
                }
                user.statuses = _.sortBy(unsortedStatuses, 'timestamp').reverse();
                memo.users.push(user);

                callback(null, memo);
            });
        }, function (err, reply) {
            reply.users = _.sortBy(reply.users, 'user');
            res.json(reply);
        });
    });
});

app.get('/factoids', function (req, res) {
    fetchFactoids(function(error, result) {
        res.json(util.parseFactoids(result));
    });
});

app.get('/api/karma', function (req, res) {
    res.json([
        {
            nick: "qmx",
            karma: 100
        },
        {
            nick: "abstractj",
            karma: 100
        },
        {
            nick: "passos",
            karma: 100
        },
        {
            nick: "kborchers",
            karma: 100
        }
    ]);
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
