module.exports = {
    global: (request, response, next) => {
    response.locals.globalMiddlewareProp = 'string from global middleware'
    next()
  },
    test1: (request, response, next) => {
    response.locals.middlewareProp = 'hi! hello!';
    next();
  },
    test1Post:(req, res, next) => {
    req.body.addedBodyProp = 'this is middleware in router';
    next()
  }
}

