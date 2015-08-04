/* 
 * @Author: somnath
 * @Date:   2015-06-23 15:27:10
 * @Last Modified by:   somnath
 * @Last Modified time: 2015-06-29 20:15:56
 */

'use strict';

(function() {
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = main;
        }
        exports.main = main;
    } else {
        requirejs.config(main());
        require(['jquery', 'hammerjs'], jqueryDeps);
    }

    function jqueryDeps(){
        require([
            'underscore', 'text', 'waves', 'velocity', 'picker',
            'jquery-hammer', 'jquery-timeago', 'jquery-easing', 
            'jquery-serialize-object'], mdgDeps);
    }
    function mdgDeps(){
        require(['materialize-global', 'picker.date', 'backbone'], mdDeps);
    }
    function mdDeps(){
        require(['materialize', 'backbone-validation'], appDeps);
    }
    function appDeps(materialize){
        require(['app/bootstrap'], function(bootstrap){
            materialize.init();
            bootstrap.init();
        });
    }

    function main() {
        return {
            urlArgs: (new Date()).getTime(),
            paths: {
                jquery: 'vendor/jquery/jquery',
                underscore: 'vendor/lodash/lodash',
                backbone: 'vendor/backbone/backbone',
                'backbone-validation': 'vendor/backbone-validation/backbone-validation-amd',
                text: 'vendor/requirejs-text/text',
                materialize: 'libs/materialize/materialize',
                'materialize-global': 'vendor/materialize/global',
                hammerjs: 'vendor/materialize/hammer.min',
                'jquery-hammer': 'vendor/materialize/jquery.hammer',
                'jquery-timeago': 'vendor/materialize/jquery.timeago.min',
                'jquery-easing': 'vendor/materialize/jquery.easing.1.3',
                'jquery-serialize-object': 'vendor/jquery-serialize-object/jquery.serialize-object',
                'picker': 'vendor/materialize/date_picker/picker',
                'picker.date': 'vendor/materialize/date_picker/picker.date',
                velocity: 'vendor/materialize/velocity.min',
                waves: 'vendor/materialize/waves',
                auth: 'app/modules/auth'
            },
            shim: {
                backbone: {
                    deps: ['jquery', 'underscore', 'text'],
                    exports: 'Backbone'
                },
                'backbone-validation': ['backbone'],
                velocity: ['jquery'],
                'waves': {
                    exports: 'Waves'
                },
                'picker': ['jquery'],
                'picker.date': ['picker'],
                'materialize-global': ['velocity', 'waves'],
                materialize: {
                    deps: ['jquery-hammer', 'materialize-global', 'jquery-timeago']
                },
                'jquery-hammer': ['jquery', 'hammerjs'],
                underscore: {
                    exports: '_'
                },
                'app/app': {
                    deps: ['backbone', 'materialize']
                }
            },
            priority: ['jquery', 'underscore', 'text'],
            deps: ['app/app']
        };
    }

}());