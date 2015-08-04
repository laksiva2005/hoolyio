/* 
* @Author: somnath
* @Date:   2015-06-29 17:58:42
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-30 20:00:58
*/

'use strict';

define([
    'app/app',
    'app/base/view',
    'auth/auth',
    'text!app/templates/layout.html'
], function(
    app,
    BaseView,
    auth,
    layoutTemplate){
    
    var LayoutView = BaseView.extend({
        initialize: function(){
            LayoutView.__super__.initialize.apply(this, arguments);
            this.template = layoutTemplate;
        },
        render: function(){
            LayoutView.__super__.render.apply(this, arguments);
            this.renderLoginView();
            this.renderRegisterView();
            this.renderHome();
            return this;
        },
        renderRegisterView: function(){
            auth.trigger('render:register', {el: this.$('#register')});
        },
        renderLoginView: function(){
            auth.trigger('render:login', {el: this.$('#login')});
        },
        renderHome: function(){
            app.trigger('render:home', {el: this.$('#home')});
        }
    });
    
    return LayoutView;
});