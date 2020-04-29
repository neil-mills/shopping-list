const {
  SchemaDirectiveVisitor,
  ForbiddenError,
} = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

class isAuthenticated extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      if (!args[2].email) {
        throw new ForbiddenError('You are not authorized for this resource');
      }
      return resolve.apply(this, args);
    };
  }
}

module.exports = { isAuthenticated };
