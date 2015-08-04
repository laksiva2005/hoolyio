/* 
 * @Author: somnath
 * @Date:   2015-06-23 17:47:03
 * @Last Modified by:   somnath
 * @Last Modified time: 2015-06-30 20:00:03
 */

'use strict';

define([
    'app/app',
    'app/base/router',
    'app/base/viewManager',
    'app/views/layoutView',
    'app/views/homeView',
], function(
    app,
    BaseRouter,
    viewManager,
    LayoutView,
    HomeView) {

    var AppRouter;

    AppRouter = BaseRouter.extend({
        execute: function() {
            return BaseRouter.__super__.execute.apply(this, arguments);
        },
        initialize: function() {
            AppRouter.__super__.initialize.apply(this, arguments);
        },
        events: function() {
            var self = this;
            app.on({
                'route:home': function() {
                    self.navigate('/', true);
                },
                'render:home': this.renderHome
            });
        },
        routes: {
            '/': 'home'
        },
        renderHome: function(options, callback){
            if(this.homeView){
                return;
            }
            this.homeView = new HomeView(options || {});
            this.listenTo(this.homeView, 'close', function(){
                this.homeView = null;
            });
            if(callback){
                callback(null, this.homeView);
            } else {
                this.homeView.render();
            }
        },
        home: function() {
            var layoutView = new LayoutView();
            viewManager.renderView(layoutView);
        }
    });

    return AppRouter;
});