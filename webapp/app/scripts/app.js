var App = window.App = Ember.Application.create();

App.pipeline = AeroGear.Pipeline({
    name: "statuses",
    settings: {
        baseURL: "http://api.aerobot.qmx.me/",
        endpoint: "statuses"
    }
});

require('scripts/routes/*');
//require('scripts/controllers/*');
require('scripts/models/*');
// require('scripts/views/*');
