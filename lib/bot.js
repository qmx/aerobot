exports.Bot = Bot;

function Bot(nick) {
    this.FACTOID_RE = /^(\w+) is (.+)$/;
    this.addressedToMe = function (message) {
        return message.indexOf(nick) === 0;
    };
    this.normalizeMessage = function (message) {
        return message.substring(message.indexOf(nick) + nick.length + 1).trim();
    }
    this.isStatusMessage = function (message) {
        return this.addressedToMe(message) && message.indexOf('#status') > 0;
    }
    this.isFactoidStoreRequest = function (message) {
        return this.addressedToMe(message) && !!this.FACTOID_RE.exec(this.normalizeMessage(message));
    }
    this.parseFactoidStoreRequest = function (message) {
        var matchData = this.FACTOID_RE.exec(this.normalizeMessage(message));
        if (matchData) {
            return {key: matchData[1], value: matchData[2]};
        }
        return false;
    }
}
