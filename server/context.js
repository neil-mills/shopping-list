const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const context = ({ req }) => {
  let token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;
  if (token) {
    try {
      token = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Authentication token is invalid, please log in'
      );
    }
  }
  return {
    email: token ? token.email : null,
    name: token ? token.name : null
  }
};

module.exports = context;
