const mongoose = require('mongoose');

module.exports = async function () {
  await mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(
      x => console.log('> successfully opened the database')
    )
    .catch(
      e => console.log('> error occurred from the database')
    )
}


