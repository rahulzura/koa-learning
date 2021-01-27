require('dotenv').config();

const http = require('http');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = new Koa();
const server = http.createServer(app.callback()); // app.callback() can be used with https.createServer to serve the same app on both
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
})

router.post('/mirror', (ctx, next) => {
  // send the parsed body back
  ctx.body = ctx.request.body;
})

app
  .use(bodyParser({
    enableTypes: ['json'],
    encoding: 'utf-8',
    jsonLimit: '10mb'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// router.allowedMethods() Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods, as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate. If a req has method post but the route does not have post method, then it will send method not allowed

server.listen(PORT, HOST, () => {
  console.log(`Server is running at  http://${server.address().address}/${server.address().port}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}, app.env: ${app.env}`);
});