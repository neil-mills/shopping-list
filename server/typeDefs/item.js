const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Price {
    date: Date!
    price: Float!
    retailerID: ID!
  }

  type Item {
    _id: ID!
    name: String!
    categoryId: ID!
    brandId: ID!
    size: Float!
    unitId: ID!
    prices: [Price]
    favourite: Boolean
    recurring: Boolean
  }

  input PriceInput {
    date: Date!
    price: Float!
    retailerId: ID!
  }

  input ItemInput {
    _id: ID!
    name: String!
    categories: [ID]
    brandId: ID!
    sizes: [ID]
    prices: [PriceInput]
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
    deleteItem(id: ID): Item
  }
`;

module.exports = typeDefs;

