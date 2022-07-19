const express = require('express');
const app = express();
const { PATH, handler, middleware, routers } = require('./index');
const PORT = 9999;

app.get(PATH.ROOT, handler.main);

app.use(express.json());
app.use(middleware.global);
app.use(PATH.API, routers);
app.use(handler.error);

app.listen(PORT, handler.listen);