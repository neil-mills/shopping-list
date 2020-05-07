const Item = require('../models/Item');
const List = require('../models/List');

const resolvers = {
  Query: {
    items: async () => {
      try {
        const items = await Item.find()
          .populate('categoryId')
          .populate('brandId')
          .populate('unitId');
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
    },
    price: async (parent, { id, listId }, context) => {
      try {
        const price = await Item.find({ _id: id, 'prices.listId': listId });
        return price;
      } catch (e) {
        return e;
      }
    },
  },
  Mutation: {
    createItem: async (
      parent,
      { listId, item: { name, categoryId, brandId, unitId, size, price = '' } },
      context
    ) => {
      try {
        const newItem = await Item.create({
          name,
          categoryId,
          brandId,
          unitId,
          size,
        });
        if (price) {
          await Item.findByIdAndUpdate(
            { _id: newItem._id },
            {
              $push: {
                prices: { listId, price },
              },
            }
          );
        }
        await List.findOneAndUpdate(
          { _id: listId },
          { $push: { items: { _id: newItem._id } } }
        );
        return newItem;
      } catch (e) {
        return e;
      }
    },
    updateItem: async (
      parent,
      { listId, item: { _id, name, categoryId, brandId, unitId, size, price = '' } },
      context
    ) => {
      try {
        console.log('LISTID=',listId);
        const newItem = await Item.findOneAndUpdate(
          { _id: _id },
          { name, categoryId, brandId, unitId, size },
          { new: true }
        );
       if (price) {
          
          await Item.findOneAndUpdate(
            { _id: newItem._id, "prices.listId": listId },
            { $set: { "prices.$.price": price } },
            { upsert: true }
          );
        }
        return newItem;
      } catch (e) {
        return e;
      }
    },
    deleteItem: async (parent, { id }, context) => {
      try {
        const deleted = await Item.findOneAndDelete({ _id: id });
        return deleted;
      } catch (e) {
        return e;
      }
    },
  },
};

module.exports = resolvers;
