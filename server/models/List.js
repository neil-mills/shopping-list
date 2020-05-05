const { Schema, model } = require('mongoose');

const listSchema = new Schema({
  date: Date,
  items: {
    type: [Schema.ObjectId],
    ref: 'Item'
  },
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
