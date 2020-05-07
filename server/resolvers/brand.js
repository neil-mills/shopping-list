const Brand = require('../models/Brand');
const validator = require('validator');

const resolvers = {
  Query: {
    brands: async (parent, { retailerId }, context) => {
      console.log('retailerId',retailerId)
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
        console.log(e);
      }
    },
    brand: async (id) => {
      try {
        const brand = await Brand.findOne({ _id: id });
        return brand;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    createBrand: async (parent, { brand }, context) => {
      try {
        if (validator.isEmpty(brand.name)) {
          console.log('name is empty');
          throw new Error('Brand name is empty');
        }
        const newBrand = await Brand.create({ ...brand });
        return newBrand;
      } catch (e) {
        return e;
      }
    },
    updateBrand: async (parent, { brand }, context) => {
      try {
        const updatedBrand = await findOneAndUpdate(
          { _id: item._id },
          { ...brand },
          { new: true }
        );
        return updatedBrand;
      } catch (e) {
        console.log(e);
      }
    },
    deleteBrand: async (parent, { id }, context) => {
      try {
        await findByIdAndRemove({ _id: id });
        return await findOne({ _id: id });
      } catch (e) {
        console.log(e);
      }
    },
  },
};

module.exports = resolvers;
