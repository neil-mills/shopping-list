
const Category = require('./category.model');

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
    deleteItem: async (parent, { id }, context) => {
      try {
        const item = await Category.findByIdAndRemove({ _id: id });
        return await Category.findOne({ _id: id });
      } catch (e) {
        console.log(e);
      }
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); //value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};

module.exports = resolvers;
