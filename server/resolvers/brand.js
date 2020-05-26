const Brand = require('../models/Brand');
const { formatError, brand } = require('../handlers/errors');
const resolvers = {
  Query: {
    brands: async (parent, args, context) => {
      try {
        const brands = await Brand.find().sort('name');
        return brands;
      } catch (e) {
        return e
      }
    },
    brand: async (id) => {
      try {
        const brand = await Brand.findOne({ _id: id });
        return brand;
      } catch (e) {
        return e
      }
    },
  },
  Mutation: {
    createBrand: async (parent, { brand: { retailerId = "", name = "" } }, context) => {
      try {
        await brand.validate({retailerId, name}, { abortEarly: false });
      } catch (e) {
        return formatError(e);
      }

      try {
        const brand = retailerId ? { name, retailerId } : { name };        
        const newBrand = await Brand.create(brand);
        return null;
      } catch (e) {
        return formatError(e);
      }
    },
    updateBrand: async (parent, { brand: {_id, name, retailerId} }, context) => {
      try {
        const updatedBrand = await findOneAndUpdate(
          { _id },
          { name, retailerId },
          { new: true }
        );
        return null;
      } catch (e) {
        return e;
      }
    },
    deleteBrand: async (parent, { id }, context) => {
      try {
        await findByIdAndRemove({ _id: id });
        return await findOne({ _id: id });
      } catch (e) {
        return e
      }
    },
  },
};

module.exports = resolvers;
