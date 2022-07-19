const { log } = console;


module.exports = {
  main: (request, response) => {
    response.json({response: 'hi!'})
  },
  error:(err, req, res, next) => {
    log(err.message)
    log(err.session === 'node' ? 'session type: node!' : 'session type is not node')

    res.status(500).send('Something broke!');
  },
  listen:() => console.log('server started!'),
  test1Post: (model) => async (req, res) => {
    log(req.body.addedBodyProp)
    log(res.locals.globalMiddlewareProp)
    log(res.locals.middlewareProp)

    log(await new model({subject:'test', description:'test'}).save());
    log(await model.find())
    
    res.send('post request success!')
  },
 test2SameGet:(req, res) => {
    console.log(res.locals.globalMiddlewareProp)
    res.send('get request responded!')
  },
  test2SamePost:(req, res) => {
    console.log(res.locals.globalMiddlewareProp)
    res.send('post request responded!')
  },
  test2Throw:(req, res) => {
    throw {message: 'intended Error', session: 'node'}
  }
}



