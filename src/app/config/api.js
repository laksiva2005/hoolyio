/* 
* @Author: somnath
* @Date:   2015-06-29 18:41:19
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-29 18:42:17
*/

'use strict';

define(function(){

    var api = {};

    var baseUrl = api.baseUrl = '/api/';
    api.loginUrl = baseUrl + 'login';

    return api;
});