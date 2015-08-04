/* 
 * @Author: somnath
 * @Date:   2015-06-24 17:17:28
 * @Last Modified by:   somnath
 * @Last Modified time: 2015-06-24 19:34:08
 */

'use strict';
define([
    'vendor/materialize/sideNav',
    'vendor/materialize/forms',
    'vendor/materialize/buttons',
    'vendor/materialize/dropdown'
], function() {

    return {
        init: init
    };

    function init() {
        $(function() {
            Waves.displayEffect();
            $('.button-collapse').sideNav({
                width: 300,
                edge: 'left'
            });
        });
    }
});