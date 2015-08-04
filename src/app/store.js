/* 
* @Author: somnath
* @Date:   2015-06-26 17:00:37
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-26 17:07:22
*/

'use strict';

define([
    'backbone'
], function(Backbone){

    var store;

    function Store(){
        this.store = {};
        this.events();
        this.initialize.apply(this, arguments);
    }

    _.extend(Store.prototype, Backbone.Events, {
        initialize: function(){
            
        },
        events: function(){

        },
        get: function(key, defaultValue){
            return this.store[key] || defaultValue || null;
        },
        set: function(key, value){
            this.store[key] = value;
            return this;
        }
    });

    store = new Store();
    store.Store = Store;

    return store;

});