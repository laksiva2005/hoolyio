/* 
* @Author: somnath
* @Date:   2015-06-23 18:08:42
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-29 19:57:46
*/

'use strict';

define([
    'backbone', 
    'app/app',
    'auth/auth',
    'app/base/view',
    'text!auth/templates/login.html'
], function(
    Backbone,
    app,
    auth,
    BaseView,
    loginTemplate){

    var LoginView;

     LoginView = BaseView.extend({
        events: function(){
            return {
                'submit': 'onSubmit'
            };
        },
        validation: function(){
            return {
                email: [{
                    required: true,
                    msg: 'Please enter email address'
                }, {
                    pattern: 'email',
                    msg: 'Please enter valid email address'
                }],
                password: [{
                    required: true,
                    msg: 'Please enter password'
                }]
            };
        },
        render: function(context, template){
            return LoginView.__super__.render.apply(this, [context, (template || loginTemplate)]);
        },
        onSubmit: function(event){
            event.preventDefault();
            var data = this.serialize();
            console.log('isValid', this.isValid(data));
            console.log(auth);
            auth.trigger('login', data, callback);
            function callback(err, result){
                console.log(err);
                if(!err){
                    auth.events.trigger('user:login', result);
                    app.events.trigger('route:home');
                }
            }
            return false;
        }
    });

    return LoginView; 
});