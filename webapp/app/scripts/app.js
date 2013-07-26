var App = window.App = Ember.Application.create();

App.pipeline = AeroGear.Pipeline({
    name: "statuses",
    settings: {
        baseURL: "http://api.aerobot.qmx.me/",
        endpoint: "statuses"
    }
});
App.buildsPipeline = AeroGear.Pipeline({
    name: "builds",
    settings: {
        baseURL: "http://api.tashboard.qmx.me/",
        endpoint: "builds"
    }
});

require('scripts/routes/*');
//require('scripts/controllers/*');
require('scripts/models/*');
// require('scripts/views/*');
