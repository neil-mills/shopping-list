const List = require('../models/List');
const { list, formatError } = require('../handlers/errors');

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
          .populate({
            path: 'items',
            model: 'Item',
          })
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
            model: 'Item',
          })
          .populate('retailerId')
          .exec();
        return list;
      } catch (e) {
        return e;
      }
    },
  },
  Mutation: {
    createList: async (parent, { list: {date, retailerId, items, complete} }, context) => {
      try {
        await list.validate({date, retailerId}, { abortEarly: false });
      } catch (e) {
        return formatError(e);
      }
      try {
        const newList = await List.create({ users, date, items, authorId, retailerId, complete });
        return null;
      } catch (e) {
        return formatError(e);
      }
    },
    updateList: async (parent, { list: { _id, date, retailerId, items, complete } }, context) => {
      console.log({ _id, date, retailerId, items })
      try {
        await list.validate({date, retailerId}, { abortEarly: false });
      } catch (e) {
        console.log('ERRORS=',e)
        return formatError(e);
      }

      try {
        const updated = await List.findOneAndUpdate(
          { _id },
          {  date, retailerId, items, complete },
          { new: true }
        );
        return null;
      } catch (e) {
        return formatError(e)
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
  },
};

module.exports = resolvers;
