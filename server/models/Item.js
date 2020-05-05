const { Schema, model } = require('mongoose');

const priceSchema = new Schema({
  date: Date,
  price: Number,
  retailerId: {
    type: Schema.ObjectId
  }
});

const itemSchema = new Schema({
  name: String,
  categoryId: {
    type: Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  brandId: {
    type: Schema.ObjectId,
    ref: 'Brand',
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  unitId: {
    type: Schema.ObjectId,
    ref: 'Unit',
    required: true
  },
  favourite: Boolean,
  recurring: Boolean,
  prices: [priceSchema]
});

const Item = model('item', itemSchema);

module.exports = Item;