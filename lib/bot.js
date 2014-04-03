function Bot(nick) {
    this.nick = nick;
    this.FACTOID_STORE_RE = /^(\w+) is (.+)$/;
    this.FACTOID_REMOVE_RE = /^forget (\w+)$/;
    this.FACTOID_RETRIEVAL_RE = /^\?(\w+)$/;
    this.FACTOID_RETRIEVAL_MENTION_RE = /^\?(\w+)(\s)@(\s)(.+)$/;
    this.KARMA_RE = /(^|\s)(\w+)([+]{2}|[-]{2})(\s|$)/;
    this.KARMA_BEST_RE = /^karma best$/;
    this.KARMA_WORST_RE = /^karma worst$/;
    this.MESSAGE_STORE_RE = /^tell (\w+)\s(.+)$/;
    this.addressedToMe = function (message) {
        return message.indexOf(nick) === 0;
    };
    this.normalizeMessage = function (message) {
        return message.substring(message.indexOf(nick) + nick.length + 1).trim();
    };
    this.isStatusMessage = function (message) {
        return this.addressedToMe(message) && message.indexOf('#status') > 0;
    };
    this.isFactoidStoreRequest = function (message) {
        return this.addressedToMe(message) && !!this.FACTOID_STORE_RE.exec(this.normalizeMessage(message));
    };
    this.parseFactoidStoreRequest = function (message) {
        var matchData = this.FACTOID_STORE_RE.exec(this.normalizeMessage(message));
        if (matchData) {
            return {key: matchData[1], value: matchData[2]};
        }
        return false;
    };
    this.isFactoidRemovalRequest = function (message) {
        return this.addressedToMe(message) && !!this.FACTOID_REMOVE_RE.exec(this.normalizeMessage(message));
    };
    this.parseFactoidRemovalRequest = function (message) {
        var matchData = this.FACTOID_REMOVE_RE.exec(this.normalizeMessage(message));
        if (matchData) {
            return matchData[1];
        }
        return false;
    };
    this.isFactoidRetrievalRequest = function (message) {
        return !!this.FACTOID_RETRIEVAL_RE.exec(message);
    };
    this.parseFactoidRetrievalRequest = function (message) {
        var matchData = this.FACTOID_RETRIEVAL_RE.exec(message);
        if (matchData) {
            return matchData[1];
        }
        return false;
    };
    this.isKarmaRequest = function (message) {
        return !!this.KARMA_RE.exec(message);
    };

    this.isKarmaBestRequest = function (message) {
        return !!this.KARMA_BEST_RE.exec(message);
    };

    this.isKarmaWorstRequest = function (message) {
        return !!this.KARMA_WORST_RE.exec(message);
    };
    this.parseKarmaRequest = function (message) {
        var matchData = this.KARMA_RE.exec(message);
        if (matchData) {
            var user = matchData[2];
            var direction;
            if (matchData[3] === '++') {
                direction = 1;
            } else if (matchData[3] === '--') {
                direction = -1;
            }
            return {user:user, direction:direction};
        }
        return false;
    };
    this.isFactoidRetrievalMentionRequest = function(message) {
        return !!this.FACTOID_RETRIEVAL_MENTION_RE.exec(message);
    };
    this.parseFactoidMentionRequests = function (message) {
        if( this.isFactoidRetrievalMentionRequest(message) ) {
            var matchData = message.split("@");
            return {
                factoid:matchData[0].trim(),
                target:matchData[1].trim()
            };
        } else {
            return false;
        }
    };
    this.isMessageStoreRequest = function (message) {
        return this.addressedToMe(message) && !!this.MESSAGE_STORE_RE.exec(this.normalizeMessage(message));
    };
    this.parseMessageStoreRequest = function (message) {
        var matchData = this.MESSAGE_STORE_RE.exec(this.normalizeMessage(message));
        if (matchData) {
            return {
                recipient: matchData[1].trim(),
                message: matchData[2].trim()
            };
        } else {
            return false;
        }
    };
}
exports.Bot = Bot;
