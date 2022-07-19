const index = require('./index');
const { PATH, handler, middleware, json, PORT, routers, connect } = index;

async function bootstrap() {
  await connect()
  index.home(PATH.ROOT, handler.main);

  index.useMiddleware(json);
  index.useMiddleware(middleware.global);

  index.useRouter(PATH.API, routers);

  index.errorHandler(handler.error);

  index.listen(PORT, handler.listen);
}

bootstrap();
