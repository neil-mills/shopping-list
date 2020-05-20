const { formatError, validator } = require('../handlers/errors');
const Category = require('../models/Category');

const resolvers = {
  Query: {
    categories: async () => {
      try {
        const categories = await Category.find().sort('name');
        return categories;
      } catch (e) {
        return e;
      }
    },
    category: async (id) => {
      try {
        const category = await Category.findOne({ _id: id });
        return category;
      } catch (e) {
        return e;
      }
    },
  },
  Mutation: {
    createCategory: async (parent, { category: { name } }, context) => {
      try {
        await validator.validate({ name }, { abortEarly: false });
      } catch (e) {
        return formatError(e);
      }

      try {
        const newCategory = await Category.create({ name });
        return newCategory;
      } catch (e) {
        return formatError(e);
      }
    },
    updateCategory: async (parent, { category }, context) => {
      try {
        const updated = await findOneAndUpdate(
          { _id: category._id },
          { ...category },
          { new: true }
        );
        return updated;
      } catch (e) {
        return e;
      }
    },
    deleteCategory: async (parent, { id }, context) => {
      try {
        const item = await Category.findByIdAndRemove({ _id: id });
        return await Category.findOne({ _id: id });
      } catch (e) {
        return e;
      }
    },
  },
};

module.exports = resolvers;
