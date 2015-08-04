/* 
* @Author: somnath
* @Date:   2015-06-29 19:21:59
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-30 18:46:59
*/

'use strict';

define([
    'backbone',
    'app/router',
    'auth/router'
], function(
    Backbone,
    AppRouter,
    AuthRouter){

    return {
        init: init
    };

    function init(){
        new AppRouter();
        new AuthRouter();
        Backbone.history.start();
        Backbone.history.navigate('!/', {trigger: true});
    }
});