const { PATH, common, middleware, useMiddleware, json, PORT, connect, home, useErrorHandler, useRouter, listen } = require('./index');
const routers = require('./routers/index')

async function bootstrap() {
  process.on('SIGINT', () => {
    require('child_process').exec('docker compose down', () => {
      process.exit(1)
    })
  });

  await connect().catch(e => {
    throw e;
  });
  
  home(PATH.ROOT, common.main);

  useMiddleware(json);
  useMiddleware(middleware.global);

  useRouter(PATH.API, routers);

  useErrorHandler(common.error);

  listen(PORT, common.listen);
}

bootstrap();
