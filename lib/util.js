var _ = require('lodash');
var sprintf = require('sprintf').sprintf;


var STATUS_KEY_RE = /^aerobot:status:(.+):(.+):(.+)/;

function parseRedisStatusKey(key) {
    var matchData = STATUS_KEY_RE.exec(key);
    if (matchData) {
        return {
            network: matchData[1],
            channel: matchData[2],
            user: matchData[3]
        };
    }
    return {};
}

function normalizeChannelName(channel) {
    return channel.substring(channel.lastIndexOf('#') + 1);
}

function parseStatuses(payload) {
    var result = [];
    for (var key in payload) {
        result.push({
            timestamp: key,
            status: payload[key]
        });
    }
    return result;
}

function hasChannel(channels, channel) {
    return _.filter(channels, { channel:channel });
}

function updateStatuses(user, statuses) {
    user.statuses = statuses;
}

function updateUser(channel, nick, statuses) {
    var targetUser = _.find(channel.users, {user:nick});
    if (!targetUser) {
        targetUser = {user:nick, statuses:[]};
        channel.users.push(targetUser);
    }
    updateStatuses(targetUser, statuses);
}

function updateChannels(network, channel, nick, processChannel) {
    var targetChannel = _.find(network.channels, {channel:channel});
    if (!targetChannel) {
        targetChannel = {channel:channel};
        network.channels.push(targetChannel);
    }
    if(processChannel) {
        processChannel(targetChannel);
    }
}

function parseStatusesRedisInput(resultObject) {
    var result = {networks:[]};
    function updateChannels_UserCB(ch) {
        if(!ch.users){
            ch.users = [];
        }
        updateUser(ch, nick, statuses);
    }
    for(var key in resultObject) {
        var tokens = key.split(":");
        var main = tokens[0] + ":" + tokens[1];
        var network = tokens[2];
        var channel = tokens[3];
        var nick = tokens[4];
        var statuses = parseStatuses(resultObject[key]);
        var targetNetwork = _.find(result.networks, {network:network});
        if (!targetNetwork) {
            targetNetwork = {
                network:network,
                channels: []
            };
            result.networks.push(targetNetwork);
        }

        updateChannels(targetNetwork, channel, nick, updateChannels_UserCB);
    }
    return {"aerobot:status": result };
}

function parseFactoids(payload, result) {
    for(var key in payload) {
        result.push({
            key: key,
            value: payload[key]
        });
    }
}

function parseFactoidRedisInput(resultObject) {
    var result = {};
    function updateChannels_Factoid_CB(ch) {
        if (!ch.factoids) {
            ch.factoids = [];
        }
        parseFactoids(resultObject[key], ch.factoids);
    }
    for(var key in resultObject) {
        var tokens = key.split(":");
        var main = tokens[0] + ":" + tokens[1];
        var network = tokens[2];
        var channel = tokens[3];
        var nick = tokens[4];

        if (!result[network]) {
            result[network] = {
                channels: []
            };
        }

        updateChannels(result[network], channel, nick, updateChannels_Factoid_CB);
    }
    return {"aerobot:factoid":result};
}

function normalizeKarmaScores(payload) {
    return _.reduce(payload, function(result, value){
        var last = result.pop();
        if (!last) {
            last = {};
        } else if ((last.score === 0) || last.score) {
            result.push(last);
            last = {};
        }
        if (last.nick) {
            last.score = parseInt(value, 10);
        } else {
            last.nick = value;
        }
        result.push(last);
        return result;
    },[]);
}

function prettyPrintKarmaScores(scores) {
    var maxLength = 0;
    var space = 2;
    var karmaString = '';
    _.forEach(scores, function(score) {
        if (score.nick.length + score.score.toString().length + space > maxLength)  {
            maxLength = score.nick.length + score.score.toString().length + space;
        }
    });

    _.forEach(scores, function(score) {
        var padding = maxLength - (score.score.toString().length);
        karmaString += (sprintf('%-'+padding+'s  %d\n', score.nick, score.score));
    });

    return karmaString;

}

exports.parseStatuses = parseStatusesRedisInput;
exports.parseFactoids = parseFactoidRedisInput;
exports.normalizeChannelName = normalizeChannelName;
exports.parseRedisStatusKey = parseRedisStatusKey;
exports.normalizeKarmaScores = normalizeKarmaScores;
exports.prettyPrintKarmaScores = prettyPrintKarmaScores;
