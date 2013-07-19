var should = require('should');
var Bot = require('../lib/bot').Bot;

describe('The Bot', function () {
    it('knows when a message is addressed to himself', function() {
        var bot = new Bot('lolz');
        bot.addressedToMe('lolz: welcome to the jungle').should.be.ok;
        bot.addressedToMe('meh: not welcome to the jungle').should.not.be.ok;
    });
    it('knows how to identify a status message', function() {
        var bot = new Bot('meh');
        bot.isStatusMessage('meh: today was a bad day #status').should.be.ok;
        bot.isStatusMessage('meh: #status today was a bad day').should.be.ok;
        bot.isStatusMessage('meh: status today was a bad day').should.not.be.ok;
        bot.isStatusMessage('meh: writing #status reports is not fun').should.be.ok;
    });
    it('knows how to normalize a message', function() {
        var bot = new Bot('lulz');
        var result = bot.normalizeMessage('lulz: welcome to the jungle');
        result.should.equal('welcome to the jungle');
    });
    it('knows how to identify factoid store requests', function(){
        var bot = new Bot('spongebob');
        bot.isFactoidStoreRequest('spongebob: cake is a lie').should.be.ok;
        bot.isFactoidStoreRequest('spongebob: the cake is a truth').should.not.be.ok;
    });
    it('knows how to parse factoid store requests', function() {
        var bot = new Bot('rly');
        var result = bot.parseFactoidStoreRequest('rly: glwtd is good luck with that dude');
        result.should.eql({key:'glwtd', value:'good luck with that dude'});
    });
    it('knows how to identify factoid removal requests', function(){
        var bot = new Bot('mnesia');
        bot.isFactoidRemovalRequest('mnesia: forget glwtd').should.be.ok;
        bot.isFactoidRemovalRequest("mnesia: don't forget it, mmkay?").should.not.be.ok;
    });
    it('knows how to forget factoids', function() {
        var bot = new Bot('amnesia');
        var result = bot.parseFactoidRemovalRequest('amnesia: forget glwtd');
        result.should.eql('glwtd');
    });
    it('knows how to identify factoid retrieval requests', function (){
        var bot = new Bot('elephant');
        bot.isFactoidRetrievalRequest('?glwtd').should.be.ok;
        bot.isFactoidRetrievalRequest('? glwtd').should.not.be.ok;
    });
    it('knows how to identify best/worst karma request', function (){
        var bot = new Bot('karma');
        bot.isKarmaBestRequest('karma worst').should.not.be.ok;
        bot.isKarmaWorstRequest('karma best').should.not.be.ok;
        bot.isKarmaBestRequest('karma best').should.be.ok;
        bot.isKarmaWorstRequest('karma worst').should.be.ok;
    });
    
    it('knows how to parse factoid retrieval requests', function (){
        var bot = new Bot('elephant');
        var result = bot.parseFactoidRetrievalRequest('?glwtd');
        result.should.eql('glwtd');
    });
    it('knows how to identify karma requests', function () {
        var bot = new Bot('mule');
        bot.isKarmaRequest('this was amazing, mule++').should.be.ok;
    });
    it('knows how to parse karma requests', function () {
        var bot = new Bot('platypus');
        bot.parseKarmaRequest('mnesia++').should.eql({ user:'mnesia', direction:1 });
        bot.parseKarmaRequest('buster--').should.eql({ user:'buster', direction:-1 });
    });
});
