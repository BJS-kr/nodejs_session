const { log } = console;

module.exports = {
  addPost(model) {
    return async (req, res) => {

    const { subject, description } = req.body;
    
    log(req.body.addedBodyProp)
    log(res.locals.globalMiddlewareProp)
    log(res.locals.middlewareProp)

    await new model({ subject, description }).save();
    log(await model.find())
    
    res.send('post request success!')
   }
  }
}