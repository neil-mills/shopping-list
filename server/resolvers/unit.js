const Unit = require('../models/Unit');

const resolvers = {
  Query: {
    units: async () => {
      try {
        const units = await Unit.find().sort('name');
        return units;
      } catch (e) {
        return e;
      }
    },
  },
  Mutation: {
    createUnit: async (parent, { unit }, context) => {
      try {
        const newUnit = await Unit.create({ ...unit });
        return newUnit;
      } catch (e) {
        return e;
      }
    },
    updateUnit: async (parent, { unit }, context) => {
      try {
        const updatedUnit = Unit.findOneAndUpdate(
          { _id: unit._id },
          { ...unit },
          { new: true }
        );
        return updatedUnit;
      } catch (e) {
        return e;
      }
    },
    deleteUnit: async (parent, { id }, context) => {
      try {
        const deletedUnit = Unit.findOneAndRemove({ _id: id });
        return deletedUnit;
      } catch (e) {
        return e;
      }
    },
  },
};

module.exports = resolvers;
