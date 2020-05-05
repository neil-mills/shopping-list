const { Schema, model } = require('mongoose');

const sizeSchema = new Schema({
  amount: Number,
  unitId: {
    type: Schema.ObjectId,
    ref: 'Unit'
  }
});

const Size = model('Size', sizeSchema);

module.exports = Size;
