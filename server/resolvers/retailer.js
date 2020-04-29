const Retailer = require('../models/Retailer');

const resolvers = {
  Query: {
    retailers: async () => {
      try {
        const retailers = await Retailer.find().sort('name');
        return retailers;
      } catch (e) {
        console.log(e);
      }
    },
    retailer: async (obj, { id }, context) => {
      try {
        const retailer = await Retailer.findOne({ _id: id });
        return retailer;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    createRetailer: async (obj, { retailer }, context) => {
      try {
        const newRetailer = await Retailer.create({ ...retailer });
        return newRetailer;
      } catch (e) {
        console.log(e);
      }
    },
    updateRetailer: async (obj, { retailer }, context) => {
      try {
        const updated = await Retailer.findOneAndUpdate(
          { _id: retailer._id },
          { ...retailer },
          { new: true }
        );
        return updated;
      } catch (e) {
        console.log(e);
      }
    },
    deleteRetailer: async (obj, { id }, context) => {
      try {
        const deleted = await Retailer.findOneAndRemove({ _id: id });
        return deleted;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

module.exports = resolvers;
