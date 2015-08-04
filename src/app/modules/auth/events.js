/* 
* @Author: somnath
* @Date:   2015-06-29 18:57:40
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-29 20:13:40
*/

'use strict';

define([
    'app/base/events',
    'app/config/api',
    'app/base/model',
], function(
    BaseEvents,
    apiConfig,
    BaseModel){

    var AuthEvents = BaseEvents.extend({
        events: function(){
            this.on('auth:login', this.login, this);
        },
        login: function(data, callback){
            var model = new BaseModel(data);
            var options = {
                url: apiConfig.loginUrl,
                success: success,
                error: error
            };

            function success(data){
                callback(null, data);
            }

            function error(err){
                callback(err);
            }
            
            model.sync('create', model, options);
        }
    });

    return AuthEvents;
    
});