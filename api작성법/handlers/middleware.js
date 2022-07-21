module.exports = {
    global: (request, response, next) => {
    response.locals.globalMiddlewareProp = 'string from global middleware'
    next()
  },
    inRouter: (request, response, next) => {
    response.locals.middlewareProp = 'hi! hello!';
    next();
  },
    inRouterMethod:(req, res, next) => {
    req.body.addedBodyProp = 'this is middleware in router';
    next()
  }
}

