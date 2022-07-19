const express = require('express');
const app = express(); 
const middleware = errorHandler = router = app.use.bind(app);
const listen = app.listen;

exports.PATH = require('./path');
exports.handler = require('./handler');
exports.middleware = require('./middleware');
exports.home = app.get.bind(app);
exports.useMiddleware = middleware;
exports.errorHandler = errorHandler;
exports.router = router;
exports.listen = listen;
exports.json = express.json();
exports.PORT = 9999;
exports.routers = [require('./test1.router'), require('./test2.router')];
