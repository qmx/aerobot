exports.Bot = Bot;

function Bot(nick) {
    this.addressedToMe = function (message) {
        return message.indexOf(nick) === 0;
    };
}
