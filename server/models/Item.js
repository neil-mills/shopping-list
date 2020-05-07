const { Schema, model } = require('mongoose');

const priceSchema = new Schema({
  price: Number,
  listId: {
    type: Schema.ObjectId,
    ref: 'List'
  }
});
//const Price = model('Price', priceSchema);

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
const Item = model('Item', itemSchema);
module.exports = Item;