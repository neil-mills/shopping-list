const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');
const User = require('../models/User');
const BCRYPT_ROUNDS = 12;

const resolvers = {
  Query: {
    user: async (parent, { id }, context) => {
      try {
        const user = await User.findOne({ _id: id });
        return user;
      } catch (e) {
        return e;
      }
    },
    users: async () => {
      try {
        const users = await User.find().sort('lastName');
        return users;
      } catch (e) {
        console.log(e);
      }
    },
    currentUser: async (obj, args, context) => {
      console.log(context)
      try {
        const { email } = context;
        const user = await User.findOne({ email: context.email });
        return user;

      } catch (e) {
        return e;
      }
    },
    loginUser: async (obj, args, context) => { 
      const user = await User.findOne({ email: args.email });
      if (user && (await bcrypt.compare(args.password, user.password))) {
        const token = jwt.sign(
          { email: user.email, name: `${user.firstName} ${user.lastName}` },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        return { token };
      } else {
        throw new AuthenticationError('Login failed');
      }
    },
  },
  Mutation: {
    createUser: async (obj, { user }, context) => {
      const currentUser = await User.findOne({ email: user.email });
      if (currentUser) {
        console.log(user);
        throw new ForbiddenError('User already exists');
      }
      const hashPassword = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
      console.log(hashPassword);
      const created = new Date();
      const newUser = await User.create({
        ...user,
        password: hashPassword,
        created,
      });
      return newUser;
    },
    updateUser: async (parent, { user }, context) => {
      const updated = new Date();
      const update = { ...user, updated };
      if (user.password)
        update.password = bcrypt.hash(user.password, BCRYPT_ROUNDS);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { ...update },
          { new: true }
        );
        return updatedUser;
      } catch (e) {
        return e;
      }
    },
    deleteUser: async (parent, { id }, context) => {
      try {
        const deletedUser = await User.findOneAndRemove({ _id: id });
        return deletedUser;
      } catch (e) {
        console.log(e);
      }
    },
    createBudget: async (parent, { id, budget }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              budgets: {
                ...budget,
              },
            },
          },
          { new: true }
        );
        return updatedUser;
      } catch (e) {
        console.log(e);
      }
    },
    updateBudget: async (parent, { id, budget }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: id, 'budgets._id': 'budget._id' },
          {
            $set: {
              'budgets.$': { ...budget },
            },
          },
          { new: true }
        );
        return updatedUser;
      } catch (e) {
        console.log(e);
      }
    },
    deleteBudget: async (parent, { id, budgetId }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: id },
          {
            $pull: {
              budgets: { _id: budgetId },
            },
          },
          { new: true }
        );
        return updatedUser;
      } catch (e) {
        console.log(e);
      }
    },
  },
  User: {
    password() {
      //when password gets requested, returns blank value
      return '';
    },
  },
};

module.exports = resolvers;
