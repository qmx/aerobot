var _ = require('lodash');
exports.parseStatuses = parseStatusesRedisInput;
exports.parseFactoids = parseFactoidRedisInput;
exports.normalizeChannelName = normalizeChannelName;
exports.parseRedisStatusKey = parseRedisStatusKey;
exports.normalizeKarmaScores = normalizeKarmaScores;

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
    for (key in payload) {
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

function parseStatusesRedisInput(resultObject) {
    var result = {};
    for(key in resultObject) {
        var tokens = key.split(":");
        var main = tokens[0] + ":" + tokens[1];
        var network = tokens[2];
        var channel = tokens[3];
        var nick = tokens[4];
        var statuses = parseStatuses(resultObject[key]);

        if (!result[network]) {
            result[network] = {
                channels: []
            };
        }

        updateChannels(result[network], channel, nick, function (ch) {
            if(!ch.users){
                ch.users = [];
            }
            updateUser(ch, nick, statuses);
        });
    }
    return {"aerobot:status": result };
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

function updateUser(channel, nick, statuses) {
    var targetUser = _.find(channel.users, {user:nick});
    if (!targetUser) {
        targetUser = {user:nick, statuses:[]};
        channel.users.push(targetUser);
    }
    updateStatuses(targetUser, statuses);
}

function updateStatuses(user, statuses) {
    user.statuses = statuses;
}

function parseFactoidRedisInput(resultObject) {
    var result = {};
    for(key in resultObject) {
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

        updateChannels(result[network], channel, nick, function (ch) {
            if (!ch.factoids) {
                ch.factoids = []
            }
            parseFactoids(resultObject[key], ch.factoids);
        });
    }
    return {"aerobot:factoid":result};
}

function parseFactoids(payload, result) {
    for(key in payload) {
        result.push({
            key: key,
            value: payload[key]
        });
    }
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
		if (last.user) {
			last.score = value
		} else {
			last.user = value;
		}
		result.push(last);
		return result;
		},[]);		
}
