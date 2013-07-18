exports.Bot = Bot;

function Bot(nick) {
    this.FACTOID_STORE_RE = /^(\w+) is (.+)$/;
    this.FACTOID_REMOVE_RE = /^forget (\w+)$/;
    this.FACTOID_RETRIEVAL_RE = /^\?(\w+)$/;
    this.KARMA_RE = /(^|\s)(\w+)([+]{2}|[-]{2})(\s|$)/;
    this.KARMA_MOST_RE = /^karma most$/;
    this.KARMA_LEAST_RE = /^karma least$/;
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
        return this.addressedToMe(message) && !!this.FACTOID_STORE_RE.exec(this.normalizeMessage(message));
    }
    this.parseFactoidStoreRequest = function (message) {
        var matchData = this.FACTOID_STORE_RE.exec(this.normalizeMessage(message));
        if (matchData) {
            return {key: matchData[1], value: matchData[2]};
        }
        return false;
    }
    this.isFactoidRemovalRequest = function (message) {
        return this.addressedToMe(message) && !!this.FACTOID_REMOVE_RE.exec(this.normalizeMessage(message));
    }
    this.parseFactoidRemovalRequest = function (message) {
        var matchData = this.FACTOID_REMOVE_RE.exec(this.normalizeMessage(message));
        if (matchData) {
            return matchData[1];
        }
        return false;
    }
    this.isFactoidRetrievalRequest = function (message) {
        return !!this.FACTOID_RETRIEVAL_RE.exec(message);
    }
    this.parseFactoidRetrievalRequest = function (message) {
        var matchData = this.FACTOID_RETRIEVAL_RE.exec(message);
        if (matchData) {
            return matchData[1];
        }
        return false;
    }
    this.isKarmaRequest = function (message) {
        return !!this.KARMA_RE.exec(message);
    }

    this.isKarmaMostRequest = function (message) {
        return !!this.KARMA_MOST_RE.exec(message);
    }

    this.isKarmaLeastRequest = function (message) {
        return !!this.KARMA_LEAST_RE.exec(message);
    }


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
    }

}
