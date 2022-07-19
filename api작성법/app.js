const index = require('./index');
const { PATH, handler, middleware, json, PORT, routers, connect } = index;

async function bootstrap() {
  process.on('SIGINT', (signal) => {
    require('child_process').exec('docker compose down', (err, stdout, stderr) => {
      process.exit(1)
    })
  })

  await connect().catch(e => {
    throw e;
  })
  index.home(PATH.ROOT, handler.main);

  index.useMiddleware(json);
  index.useMiddleware(middleware.global);

  index.useRouter(PATH.API, routers);

  index.errorHandler(handler.error);

  index.listen(PORT, handler.listen);
}

bootstrap();
