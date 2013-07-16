var _ = require('lodash');
exports.parseStatuses = parseRedisInput;

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

function parseRedisInput(resultObject) {
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

        updateChannels(result[network], channel, nick, statuses);
    }
    return {"aerobot:status": result };
}

function updateChannels(network, channel, nick, statuses) {
    var targetChannel = _.find(network.channels, {channel:channel});
    if (!targetChannel) {
        targetChannel = {channel:channel, users:[]};
        network.channels.push(targetChannel);
    }
    updateUser(targetChannel, nick, statuses);
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
