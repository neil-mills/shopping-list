const { Schema, model } = require('mongoose');

const unitSchema = new Schema({
  name: String
});

const Unit = model('Unit', unitSchema);

module.exports = Unit;