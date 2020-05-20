const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Unit {
    _id: ID!
   name: String! 
  }
  input UnitInput {
    _id: ID
    name: String!
  }
  type Query {
    units: [Unit]  
  }
  type Mutation {
    createUnit(unit: UnitInput): [Error]
    updateUnit(unit: UnitInput): [Error]
    deleteUnit(id: ID): Unit
  }
`;

module.exports = typeDefs;