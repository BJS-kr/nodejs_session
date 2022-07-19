const { Schema, model } = require('mongoose');

const testModel = model('Test', new Schema({
  subject: String,
  description: String,
}));

module.exports = testModel