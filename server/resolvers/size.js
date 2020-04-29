const Size = require('../models/Size');

const resolvers = {
  Query: {
    sizes: async (parent, { id }, context) => {
      try {
        const sizes = await Size.find({ itemId: id }).sort('size');
        return sizes;
      } catch (e) {
        console.log(e);
      }
    }
  },
  Mutation: {
    createSize: async (parent, { size }, context) => {
      try {
        const newSize = await Size.create({ ...size });
        return newSize;
      } catch (e) {
        console.log(e);
      }
    },
    updateSize: async (parent, { size }, context) => {
      try {
        const updatedSize = await Size.findOneAndUpdate({ _id: size._id }, { ...size }, { new: true });
        return updatedSize;
      } catch (e) {
        console.log(e);
      }
    },
    deleteSize: async (parent, { id }, context) => {
      try {
        const deletedSize = await Size.findOneAndDelete({ _id: id });
        return deletedSize;
      } catch (e) {
        console.log(e);
      }
    }
  }
};

module.exports = resolvers;
