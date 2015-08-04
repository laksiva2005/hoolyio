/* 
* @Author: somnath
* @Date:   2015-06-25 17:08:53
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-26 15:50:34
*/

'use strict';

define(['backbone'], function(Backbone){

    var mapCompiled = {};
    var instance;
    var viewInstance;

    function ViewManager(){
        this.initialize.apply(this, arguments);
    }

    _.extend(ViewManager.prototype, Backbone.Events, {
        initialize: function(){
            this.events();
        },
        events: function(){
            this.on('view:remove', this.removeView);
        },
        renderView: function(view){
            var args = _(arguments).slice(1);
            if(viewInstance){
                viewInstance.close();
            }
            viewInstance = view;
            this.render(view.render.apply(view, args).el);
        },
        render: function(template){
            $('#shell').html(template);
            return this;
        },
        renderTemplate: function(template, context){
            var compiled = this._getCompiled(template);
            context = _.extend({}, context || {}, {
                route: Backbone.history.navigate
            });
            return compiled(context);
        },
        _getCompiled: function(template){
            return mapCompiled[template] || (mapCompiled[template] = _.template(template || ''));
        },
        removeView: function(view){
            view = null;
        }
    });

    instance = new ViewManager();

    return instance;
});