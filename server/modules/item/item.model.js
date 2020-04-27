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
  categories: {
    type: [Schema.ObjectId],
    ref: 'Category',
    required: true
  },
  brandId: {
    type: Schema.ObjectId,
    ref: 'Brand',
    required: true
  },
  sizes: {
    type: [Schema.ObjectId],
    ref: 'Size'
  },
  favourite: Boolean,
  recurring: Boolean,
  prices: [priceSchema]
});

const Item = model('item', itemSchema);

module.exports = Item;