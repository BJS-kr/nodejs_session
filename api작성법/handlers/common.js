const { log } = console;

module.exports =  {
    main(request, response) {
    response.json({response: 'hi!'})
  },

  error(err, req, res, next) {
    log(err.message)
    log(err.session === 'node' ? 'session type: node!' : 'session type is not node')

    res.status(500).send('Something broke!');
  },

  listen() {
    console.log('server started!')
  }
}