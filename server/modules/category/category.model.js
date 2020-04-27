const { Schema, model } = require('mongoose');

const subCategorySchema = new Schema({
  name: String
});

const categorySchema = new Schema({
  name: String,
  subCategory: [subCategorySchema]
});

const Category = model('Category', categorySchema);

module.exports = Category;
