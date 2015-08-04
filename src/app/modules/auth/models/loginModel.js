/* 
* @Author: somnath
* @Date:   2015-06-23 18:28:29
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-23 18:31:03
*/

'use strict';

define(['backbone'], function(Backbone){

    return Backbone.Model.extend({
        url: '/login',
        login: function(){
            return this.save();
        }
    });
});