const Brand = require('../models/Brand');
const validator = require('validator');

const resolvers = {
  Query: {
    brands: async (parent, { retailerId }, context) => {
      try {
        const brands = await Brand.find({
          $or: [
            { retailerId: retailerId },
            { retailerId: undefined },
            { retailerId: null }
          ]
        }).sort('name');
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
        if (validator.isEmpty(name)) {
          console.log('name is empty');
          throw new Error('Brand name is empty');
        }
        const brand = retailerId ? { name, retailerId } : { name };
        
        const newBrand = await Brand.create(brand);
        return newBrand;
      } catch (e) {
        return e;
      }
    },
    updateBrand: async (parent, { brand }, context) => {
      try {
        const updatedBrand = await findOneAndUpdate(
          { _id: brand._id },
          { ...brand },
          { new: true }
        );
        return updatedBrand;
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
