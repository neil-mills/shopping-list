const List = require('../models/List');

const resolvers = {
  Query: {
    lists: async (obj, { filters }, context) => {
      console.log('filters=', filters);
      let query = { authorId: filters.authorId };
      query =
        filters.complete !== undefined
          ? { ...query, complete: filters.complete }
          : query;=
      query = filters.minDate
        ? { ...query, date: { $gte: filters.minDate } }
        : query;
      query = filters.maxDate
        ? { ...query, date: { $lte: filters.maxDate } }
        : query;
      try {
        const lists = await List.find(query).sort('date-1');
        return lists;
      } catch (e) {
        return e;
      }
    },
    list: async (obj, { id }, context) => {
      console.log('ID=', id);
      try {
        const list = await List.findOne({ _id: id });
        return list;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    createList: async (parent, { list }, context) => {
      try {
        const newList = await List.create({ ...list });
        return newList;
      } catch (e) {
        console.log(e);
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
        console.log(e);
      }
    },
    deleteList: async (parent, { id }, context) => {
      try {
        await List.findByIdAndRemove({ _id: id });
        return await List.findOne({ _id: id });
      } catch (e) {
        console.log(e);
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
        console.log(e);
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
