const { Schema, model } = require('mongoose');

const listItemSchema = new Schema({
  itemId: {
    type: Schema.ObjectId,
    ref: 'Item'
  },
  sizeId: {
    type: Schema.ObjectId,
    ref: 'Size'
  }
});

const listSchema = new Schema({
  date: Date,
  items: [listItemSchema],
  authorId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  users: {
    type: [Schema.ObjectId],
    ref: 'User'
  },
  retailerId: {
    type: Schema.ObjectId,
    ref: 'Retailer'
  },
  complete: Boolean
});

const List = model('List', listSchema);

module.exports = List;
