const { Schema, model } = require('mongoose');

const retailerSchema = new Schema({
  name: String
});

const Retailer = model('Retailer', retailerSchema);

module.exports = Retailer;
