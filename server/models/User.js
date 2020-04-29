const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const budgetSchema = new Schema({
  date: Date,
  amount: Number
});

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  budgets: {
    type: [budgetSchema]
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
const User = model('User', userSchema);

module.exports = User;