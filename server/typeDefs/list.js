const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type List {
    _id: ID!
    date: Date
    items: [Item]
    authorId: ID!
    users: [ID]
    retailerId: Retailer
    complete: Boolean
  }

  input ListFilterInput {
    authorId: ID
    complete: Boolean
    minDate: Date
    maxDate: Date
  }

  input ListInput {
    _id: ID
    date: Date!
    items: [ID]
    authorId: ID
    retailerId: ID
    complete: Boolean
  }

  # define the query type that responds to the 'posts' query
  type Query {
    lists(filters: ListFilterInput): [List]
    list(id: ID): List
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    createList(list: ListInput): [Error]
    updateList(list: ListInput): [Error]
    deleteList(id: ID): List
  }
`;

module.exports = typeDefs;
