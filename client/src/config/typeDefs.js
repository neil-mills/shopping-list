import gql from 'graphql-tag';

export const typeDefs = gql`
  input CurrentUserInput {
    _id: ID!
    name: String!
  }
  extend type Query {
    isLoggedIn: Boolean!
    currentUser: CurrentUserInput
  }
`;

