/*global Ember */

var statusPipe = AeroGear.Pipeline([{
    name: 'statuses',
    settings: {
        baseURL: 'http://api.aerobot.qmx.me/'
    }
}]).pipes.statuses;

var App = window.App = Ember.Application.create();

/* Order and include as you please. */
// require('scripts/routes/*');
// require('scripts/controllers/*');
// require('scripts/models/*');
// require('scripts/views/*');

App.Router.map(function () {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        statusPipe.read({
            success: function (data) {
                var result = [];
                for (item in data) {
                    result.push({item:data[item]});
                }
                controller.set('model', result);
            }
        });
    }
});
