const express = require('express');
const app = express(); 
const useMiddleware = useErrorHandler = useRouter = app.use.bind(app);
const listen = app.listen.bind(app);

exports.PATH = require('./path');
exports.common = require('./handlers/common');
exports.handler_1 = require('./handlers/handler1');
exports.handler_2 = require('./handlers/handler2');
exports.middleware = require('./handlers/middleware');
exports.home = app.get.bind(app);
exports.useMiddleware = useMiddleware;
exports.useErrorHandler = useErrorHandler;
exports.useRouter = useRouter;
exports.listen = listen;
exports.json = express.json();
exports.PORT = 9999;
exports.router = express.Router();
exports.connect = require('./db/connection');
exports.testModel = require('./db/schema');
