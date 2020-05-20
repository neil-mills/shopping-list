const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  directive @isAuthenticated on FIELD_DEFINITION

  type Token {
    token: String!
  }

  type Error {
    message: String!
    path: String!
  }
  
`;

module.exports = typeDefs;