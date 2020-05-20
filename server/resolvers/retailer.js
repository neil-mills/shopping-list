const Retailer = require('../models/Retailer');
const { validator, formatError } = require('../handlers/errors');

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
    createRetailer: async (obj, { retailer: { name } }, context) => {
      try {
        await validator.validate({name}, { abortEarly: false });
      } catch (e) {
        return formatError(e);
      }
      try {
        const newRetailer = await Retailer.create({ name });
        return null;
      } catch (e) {
        return formatError(e);
      }
    },
    updateRetailer: async (obj, { retailer }, context) => {
      try {
        await validator.validate(retailer, { abortEarly: false });
      } catch (e) {
        return formatError(e);
      }
      try {
        const updated = await Retailer.findOneAndUpdate(
          { _id: retailer._id },
          { ...retailer },
          { new: true }
        );
        return null;
      } catch (e) {
        formatError(e);
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
