const List = require('../models/List');

const resolvers = {
  Query: {
    lists: async (obj, { filters }, context) => {
      let query = { authorId: filters.authorId };
      query =
        filters.complete !== undefined
          ? { ...query, complete: filters.complete }
          : query;
      query = filters.minDate
        ? { ...query, date: { $gte: filters.minDate } }
        : query;
      query = filters.maxDate
        ? { ...query, date: { $lte: filters.maxDate } }
        : query;
      try {
        const lists = await List.find(query)
          .populate('retailerId')
          .sort('date-1');
        return lists;
      } catch (e) {
        return e;
      }
    },
    list: async (obj, { id }, context) => {
      try {
        const list = await List.findOne({ _id: id })
          .populate({
            path: 'items',
            model: 'Item'
          })
          .populate('retailerId').exec()
        return list;
      } catch (e) {
        return e;
      }
    },
  },
  Mutation: {
    createList: async (parent, { list }, context) => {
      try {
        const newList = await List.create({ ...list });
        return newList;
      } catch (e) {
        return e;
      }
    },
    updateList: async (parent, { list }, context) => {
      try {
        const updated = await findOneAndUpdate(
          { _id: list._id },
          { ...list },
          { new: true }
        );
        return updated;
      } catch (e) {
        return e;
      }
    },
    deleteList: async (parent, { id }, context) => {
      try {
        await List.findByIdAndRemove({ _id: id });
        return await List.findOne({ _id: id });
      } catch (e) {
        return e;
      }
    },
    createListItem: async (parent, { id, listItem }, context) => {
      try {
        const updatedList = await List.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              items: {
                ...listItem,
              },
            },
          },
          { new: true }
        );
        return updatedList;
      } catch (e) {
        return e;
      }
    },
    updateListItem: async (parent, { listId, listItem }, context) => {
      try {
        List.findOneAndUpdate(
          { _id: listId, 'items._id': 'listItem._id' },
          {
            $set: {
              'items.$.itemId': listItem.itemId,
              'items.$.sizeId': listItem.sizeId,
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    deleteListItem: async (parent, { listId, id }, context) => {
      try {
        const updatedList = await List.findOneAndUpdate(
          { _id: listId },
          {
            $pull: {
              items: { _id: id },
            },
          },
          { new: true }
        );
        return updatedList;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

module.exports = resolvers;
