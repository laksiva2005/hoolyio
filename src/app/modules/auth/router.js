/* 
 * @Author: somnath
 * @Date:   2015-06-23 17:45:33
 * @Last Modified by:   somnath
 * @Last Modified time: 2015-06-30 19:50:21
 */

'use strict';

define([
    'app/app',
    'app/base/router',
    'app/base/viewManager',
    'app/base/model',
    'auth/auth',
    'auth/models/loginModel',
    'auth/views/loginView',
    'auth/views/registerView'
], function(
    app,
    BaseRouter,
    viewManager,
    Model,
    auth,
    loginModel,
    LoginView,
    RegisterView) {

    return BaseRouter.extend({
        initialize: function() {
            this.events();
        },
        execute: function() {
            return BaseRouter.__super__.execute.apply(this, arguments);
        },
        events: function() {
            var self = this;
            auth.on({
                'route:login': function() {
                    self.navigate('login', true);
                },
                'route:register': function() {
                    self.navigate('login', true);
                },
                'render:login': this.renderLogin,
                'render:register': this.renderRegister,
                'login': this.login_,
                'register': this.register_
            });
        },
        routes: {
            '/login': 'login',
            '/register': 'register'
        },
        login: function() {
            this.renderLogin(null, onRenderLogin);

            function onRenderLogin(err, view) {
                viewManager.renderView(view);
            }
        },
        register: function() {
            this.renderRegister(null, onRenderRegister);

            function onRenderRegister(err, view) {
                viewManager.renderView(view);
            }
        },
        renderLogin: function(options, callback) {
            var self = this;
            if (this.loginView) {
                return;
            }
            this.loginView = new LoginView(options || {});
            this.listenTo(this.loginView, 'login', loginCallback);
            this.listenTo(this.loginView, 'close', function() {
                this.loginView = null;
                this.loginModel = null;
            });

            function loginCallback(data) {
                self.login_(data, onLogin);
            }

            function onLogin(err) {
                if (!err) {
                    app.trigger('route:home');
                }
            }

            if (callback) {
                callback(null, this.loginView);
            } else {
                this.loginView.render();
            }
        },
        login_: function(data, callback) {
            if (!this.loginModel) {
                this.loginModel = new loginModel();
            }

            this.loginModel.save(data).then(success, error);

            function success(result) {
                callback(null, result);
            }

            function error(err) {
                callback(err);
            }
        },
        renderRegister: function(options, callback) {
            var self = this;
            if (this.registerView) {
                return;
            }
            this.registerView = new RegisterView(options || {});
            this.listenTo(this.registerView, 'register', registerCallback);
            this.listenTo(this.registerView, 'close', function() {
                this.registerView = null;
                this.registerModel = null;
            });

            function registerCallback(data) {
                self.register_(data, onRegister);
            }

            function onRegister(err, result) {
                if (!err) {
                    app.trigger('route:home', true);
                }
            }
            if (callback) {
                callback(null, this.registerView);
            } else {
                this.registerView.render();
            }
        },
        register_: function(data, callback) {
            if (!this.registerModel) {
                this.registerModel = new Model();
            }
            this.registerModel.save(data).then(success, error);

            function success(result) {
                callback(null, result);
            }

            function error(err) {
                callback(err);
            }
        }
    });
});