const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Size {
    _id: ID!
    amount: Float!
    unitId: ID!
  }
  input SizeInput {
    _id: ID!
    size: Float!
    unitId: ID!
  }
  # define the query type that responds to the 'posts' query
  type Query {
    sizes(itemId:ID): [Size]
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    createSize(size: SizeInput): Size
    updateSize(size: SizeInput): Size
    deleteSize(id: ID): Size
  }
`;

module.exports = typeDefs;
