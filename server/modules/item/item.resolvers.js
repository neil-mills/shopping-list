import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const Item = require('./item.model');

const resolvers = {
  Query: {
    items: async () => {
      try {
        const items = await Item.find();
        return items;
      } catch (e) {
        console.log(e);
      }
    },
    item: async (id) => {
      try {
        const item = await Item.findOne({ _id: id });
        return item;
      } catch (e) {
        console.log(e);
      }
    }
  },
  Mutation: {
    createItem: async (parent, { item }, context) => {
      try {
        const newItem = await Item.create({ ...item });
        return newItem;
      } catch (e) {
        console.log(e);
      }
    },
    updateItem: async (parent, { item }, context) => {
      try {
        const updated = await findOneAndUpdate({ _id: item._id }, { ...item }, { new: true });
        return updated;
      } catch (e) {
        console.log(e)
      }
    },
    deleteItem: async (parent, { id }, context) => {
      try {
        const item = await findByIdAndRemove({ _id: id });
        return await Item.findOne({ _id: id });
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
