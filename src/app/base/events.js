/* 
* @Author: somnath
* @Date:   2015-06-29 19:03:44
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-29 19:06:07
*/

'use strict';

define(['backbone'], function(Backbone){

    function BaseEvents(){
        this.events();
        this.initialize.apply(this, arguments);
    }

    BaseEvents.extend = Backbone.Model.extend;

    _.extend(BaseEvents.prototype, Backbone.Events, {
        initialize: function(){},
        events: function(){

        }
    });

    return BaseEvents;


});