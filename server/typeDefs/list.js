const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type ListItem {
    _id: ID!
    itemId: ID!
    sizeId: ID!
  }
  type List {
    _id: ID!
    date: Date
    items: [ListItem]
    authorId: ID!
    users: [ID]
    retailerId: ID!
    complete: Boolean
  }

  input ListInput {
    _id: ID!
    date: Date!
    items: [ListItemInput]
    authorId: ID
    retailerId: ID
    complete: Boolean
  }

  input ListItemInput {
    _id: ID!
    itemId: ID!
    sizeId: ID!
  }

  # define the query type that responds to the 'posts' query
  type Query {
    lists(userId:ID): [List]
    list(id:ID): List
    listItems(listId:ID): [ListItem]
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    createList(list: ListInput): List
    updateList(list: ListInput): List
    deleteList(id: ID): List
    createListItem(listItem: ListItemInput): ListItem
    updateListItem(listItem: ListItemInput): ListItem
    deleteListItem(id:ID): ListItem
  }
`;

module.exports = typeDefs;

