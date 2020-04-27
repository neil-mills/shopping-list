const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Price {
    date: Date
    price: Float
    retailerID: ID
  }

  type Item {
    _id: ID!
    name: String!
    categories: [ID]
    brandId: ID!
    sizes: [ID]
    prices: [Price]
    favourite: Boolean
    recurring: Boolean
  }

  input ItemInput {
    _id: ID!
    name: String!
    categories: [ID]
    brandId: ID!
    sizes: [ID]
    prices: [Price]
    favourite: Boolean
    recurring: Boolean
  }

  # define the query type that responds to the 'posts' query
  type Query {
    items: [Item]
    item(id:ID): Item
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    createItem(item: ItemInput): Item
    updateItem(item: ItemInput): Item
    deleteItem(id: ID):
  }
`;

module.exports = typeDefs;

