const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # define Post input
  input PostInput {
    _id: ID!
    title: String!
    content: String!
  }

  # define the Post type
  type Post {
    _id: ID!
    title: String!
    content: String!
  }

  # define the query type that responds to the 'posts' query
  type Query {
    posts: [Post]
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    addPost(post: PostInput): Post
  }
`;

module.exports = typeDefs;
