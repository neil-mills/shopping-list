const Unit = require('../models/Unit');
const { validator, formatError } = require('../handlers/errors');
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
    createUnit: async (parent, { unit: {name} }, context) => {
      try {
        await validator.validate({ name }, { abortEarly: false });
      } catch (e) {
        return formatError(e);
      }

      try {
        const newUnit = await Unit.create({ name });
        return newUnit;
      } catch (e) {
        return formatError(e);
      }
    },
    updateUnit: async (parent, { unit:{_id, name} }, context) => {
      try {
        await validator.validate({ name }, { abortEarly: false });
      } catch (e) {
        return formatError(e);
      }

      try {
        const updatedUnit = Unit.findOneAndUpdate(
          { _id },
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
