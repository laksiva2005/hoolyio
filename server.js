/* 
* @Author: somnath
* @Date:   2015-06-23 16:18:02
* @Last Modified by:   somnath
* @Last Modified time: 2015-06-23 17:57:02
*/

'use strict';

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/src/'));
app.use('/release', express.static(__dirname + '/dist/'));

try {
    app.listen(1337);
    console.log('server started on http://localhost:1337/');
} catch (e) {
    console.log('could not start server on 1337 port');
}