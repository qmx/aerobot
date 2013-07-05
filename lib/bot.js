exports.Bot = Bot;

function Bot(nick) {
    this.nick = nick;
}
Bot.prototype.addressedToMe = function (message) {
    return message.indexOf(this.nick) === 0;
};
