const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Retailer {
    _id: ID!
    name: String
  }
  input RetailerInput {
    _id: ID
    name: String!
  }
  # define the query type that responds to the 'posts' query
  type Query {
    retailers: [Retailer]
    retailer(id: ID): Retailer
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    createRetailer(retailer: RetailerInput): [Error!]
    updateRetailer(retailer: RetailerInput): [Error!]
    deleteRetailer(id: ID): Retailer
  }
`;

module.exports = typeDefs;
