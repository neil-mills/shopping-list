const Item = require('../models/Item');

const resolvers = {
  Query: {
    items: async () => {
      try {
        const items = await Item.find().populate('categoryId').populate('brandId').populate('unitId');
        return items;
      } catch (e) {
        return e;
      }
    },
    item: async (id) => {
      try {
        const item = await Item.findOne({ _id: id });
        return item;
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    createItem: async (parent, { item }, context) => {
      try {
        const newItem = await Item.create({ ...item });
        return newItem;
      } catch (e) {
        return e;
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
        return e;
      }
    }
  },
};

module.exports = resolvers;
