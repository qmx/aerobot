exports.Bot = Bot;

function Bot(nick) {
    this.addressedToMe = function (message) {
        return message.indexOf(nick) === 0;
    };
    this.normalizeMessage = function (message) {
        return message.substring(message.indexOf(nick) + nick.length + 1).trim();
    }
}
