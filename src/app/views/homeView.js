/* 
* @Author: somnath
* @Date:   2015-06-30 19:41:33
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-30 19:43:24
*/

'use strict';

define([
    'app/app',
    'app/base/view',
    'text!app/templates/home.html'
], function(app, BaseView, homeTemplate){

    var HomeView = BaseView.extend({
        initialize: function(){
            HomeView.__super__.initialize.apply(this, arguments);
            this.template = homeTemplate;
        }
    });

    return HomeView;

});