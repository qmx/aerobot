var expect = require('chai').expect;
var util = require('../lib/util');

describe('Util module', function() {
    it('knows how to parse aerobot:status keys', function() {
        var key = 'aerobot:status:irc.freenode.net:aerobot-test:whatever';
        expect(util.parseRedisStatusKey(key)).to.eql({
            network: 'irc.freenode.net',
            channel: 'aerobot-test',
            user: 'whatever'
        });
    });
    it('knows how to normalize channel names', function () {
        expect(util.normalizeChannelName('#aerobot-test')).to.eql('aerobot-test');
    });
    it('knows how to normalize karma sets', function () {
        var scores = ['summersp','1','summersbot','0','summersbot1','-5'];
        var normalScores = [
            {user:'summersp',score:1},
            {user:'summersbot',score:0},
            {user:'summersbot1',score:-5}
        ];
        expect(util.normalizeKarmaScores(scores)).to.eql(normalScores);
    });
    it('knows how to pretty print karma', function () {
        var scores = [
            {user:'summersp',score:1},
            {user:'summersbot',score:0},
            {user:'summersbot1',score:-15}
        ];

        var scoresString = "summersp         1\nsummersbot       0\nsummersbot1    -15\n";

        var lines = util.prettyPrintKarmaScores(scores);
        expect(lines).to.eql(scoresString);
    });
    it('knows how to parse redis factoid output accordingly', function(){
        var redisOutput = {
            "aerobot:factoid:irc.freenode.net:#aerobot-test": {
                "coffee": "amazing",
                "sleep": "overrated"
            }
        };
        expect(util.parseFactoids(redisOutput)).to.eql({
            "aerobot:factoid": {
                "irc.freenode.net": {
                    channels: [
                        {
                            channel: "#aerobot-test",
                            factoids: [
                                {
                                    key: "coffee",
                                    value:"amazing"
                                },
                                {
                                    key: "sleep",
                                    value:"overrated"
                                }
                            ]
                        }
                    ]
                }
            }
        });
    });
    it('knows how to parse redis statuses output accordingly', function(){
        var redisOutput = {
            "aerobot:status:irc.freenode.net:#aerobot-test:qmx": {
                "2013-07-10T17:15:42.198Z": "super boring day for a #status",
                "2013-07-10T17:16:25.967Z": "medium rare with aged cheddar and mushrooms #status"
            },
            "aerobot:status:irc.freenode.net:#aerobot-test:whatever": {
                "2013-07-11T17:01:33.123Z": "who doesn't care about cheese? #status"
            }
        };
        expect(util.parseStatuses(redisOutput)).to.eql({
            "aerobot:status": {
                "networks": [
                    {
                        network: "irc.freenode.net",
                        channels: [
                            {
                                channel: "#aerobot-test",
                                users: [
                                    {
                                        user: "qmx",
                                        statuses: [
                                            {
                                                timestamp: "2013-07-10T17:15:42.198Z",
                                                status: "super boring day for a #status"
                                            },
                                            {
                                                timestamp: "2013-07-10T17:16:25.967Z",
                                                status: "medium rare with aged cheddar and mushrooms #status"
                                            }

                                        ]
                                    },
                                    {
                                        user: "whatever",
                                        statuses: [
                                            {
                                                timestamp: "2013-07-11T17:01:33.123Z",
                                                status: "who doesn't care about cheese? #status"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });
    });
});
