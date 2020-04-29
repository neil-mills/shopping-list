const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
  }

  input CategoryInput {
    _id: ID
    name: String!
  }

  # define the query type that responds to the 'posts' query
  type Query {
    categories: [Category]
    category(id: ID): Category
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    createCategory(category: CategoryInput): Category
    updateCategory(category: CategoryInput): Category
    deleteCategory(id: ID): Category
  }
`;

module.exports = typeDefs;
