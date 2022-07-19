const express = require('express');
const app = express(); 
const middleware = errorHandler = useRouter = app.use.bind(app);
const listen = app.listen.bind(app);

exports.PATH = require('./path');
exports.handler = require('./handler');
exports.middleware = require('./middleware');
exports.home = app.get.bind(app);
exports.useMiddleware = middleware;
exports.errorHandler = errorHandler;
exports.useRouter = useRouter;
exports.listen = listen;
exports.json = express.json();
exports.PORT = 9999;
exports.router = express.Router();
exports.connect = require('./connection')
exports.testModel = require('./schema')
exports.routers = [require('./test1.router'), require('./test2.router')];