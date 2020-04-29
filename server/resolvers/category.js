
const Category = require('../models/Category');

const resolvers = {
  Query: {
    categories: async () => {
      try {
        const categories = await Category.find().sort('name');
        return categories;
      } catch (e) {
        console.log(e);
      }
    },
    category: async (id) => {
      try {
        const category = await Category.findOne({ _id: id });
        return category;
      } catch (e) {
        console.log(e);
      }
    }
  },
  Mutation: {
    createCategory: async (parent, { category }, context) => {
      try {
        const newCategory = await Category.create({ ...category });
        return newCategory;
      } catch (e) {
        console.log(e);
      }
    },
    updateCategory: async (parent, { category }, context) => {
      try {
        const updated = await findOneAndUpdate({ _id: category._id }, { ...category }, { new: true });
        return updated;
      } catch (e) {
        console.log(e)
      }
    },
    deleteCategory: async (parent, { id }, context) => {
      try {
        const item = await Category.findByIdAndRemove({ _id: id });
        return await Category.findOne({ _id: id });
      } catch (e) {
        console.log(e);
      }
    }
  },
};

module.exports = resolvers;
