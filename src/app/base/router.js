'use strict';

define(['backbone', 'app/store'], function(Backbone, store) {

    var BaseRouter = Backbone.Router.extend({
        initialize: function() {
            BaseRouter.__super__.initialize.apply(this, arguments);
            if(this.events){
                this.events();
            }
        },
        events: function(){},
        route: function(route, name, callback){
            var args;
            route = '!/' + (route || '').replace(/^\//, '');
            args = [route].concat(_(arguments).slice(1).value());

            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) callback = this[name];

            var router = this;

            Backbone.history.route(route, function(fragment) {
                var args = router._extractParameters(route, fragment);
                var next = function(){
                    callback && callback.apply(router, args);
                    router.trigger.apply(router, ['route:' + name].concat(args));
                    router.trigger('route', name, args);
                    Backbone.history.trigger('route', router, name, args);
                    router.after.apply(router, args);       
                };
                router.before.apply(router, [args, next]);
            });

            return BaseRouter.__super__.route.apply(this, args);
        },
        navigate: function(fragment, options){
            var args;
            if(options === true){
                options = {trigger: true};
            }
            fragment = '!/' + (fragment || '').replace(/^\//, '');
            args = [fragment, options].concat(_(arguments).slice(2).value());
            return BaseRouter.__super__.navigate.apply(this, args);
        },
        execute: function(){
            if(!store.get('user.isLoggedIn', false)){
                this.navigate('/login', true);
                return false;
            }
            return BaseRouter.__super__.execute.apply(this, arguments);
        }
    });

    return BaseRouter;
});