const { Schema, model } = require('mongoose');

const brandSchema = new Schema({
  name: String,
  retailerId: {
    type: Schema.ObjectId,
    ref: 'Retailer'
  }
});

const Brand = model('Brand', brandSchema);

module.exports = Brand;
