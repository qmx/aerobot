var should = require('should');
var Bot = require('../lib/bot').Bot;

describe('The Bot', function () {
    it('holds basic configuration', function () {
        var bot = new Bot('lulz');
        bot.nick.should.equal('lulz');
    });
    it('knows when a message is addressed to himself', function() {
        var bot = new Bot('lolz');
        bot.addressedToMe('lolz: welcome to the jungle').should.be.ok;
        bot.addressedToMe('meh: not welcome to the jungle').should.not.be.ok;
    });
});