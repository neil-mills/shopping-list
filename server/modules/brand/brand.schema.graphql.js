const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Brand {
    _id: ID!
    name: String!
    retailerId: ID!
  }

  input BrandInput {
    _id: ID!
    name: String!
    retailerId: ID!
  }

  # define the query type that responds to the 'posts' query
  type Query {
    brands: [Brand]
    brand(id:ID): Brand
  }

  # define the mutation to add new posts with required fields, which
  type Mutation {
    createBrand(brand: BrandInput): Brand
    updateBrand(brand: BrandInput): Brand
    deleteBrand(id: ID):Boolean
  }
`;

module.exports = typeDefs;

