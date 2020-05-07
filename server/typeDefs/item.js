const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Price {
    listId: ID
    price: Float
  }

  type Item {
    _id: ID!
    name: String!
    userId: ID!
    categoryId: ID!
    brandId: ID!
    size: Float!
    unitId: ID!
    prices: [Price]
    favourite: Boolean
    recurring: Boolean
  }

  input ItemInput {
    _id: ID
    name: String!
    userId: ID!
    categoryId: ID!
    brandId: ID!
    unitId: ID!
    size: Float!
    price: Float
    favourite: Boolean
    recurring: Boolean
  }

  # define the query type that responds to the 'posts' query
  type Query {
    items: [Item]
    item(id: ID): Item
    price(listId: ID): Price
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    createItem(listId: ID, item: ItemInput): Item
    updateItem(listId: ID, item: ItemInput): Item
    deleteItem(id: ID): Item
  }
`;

module.exports = typeDefs;
