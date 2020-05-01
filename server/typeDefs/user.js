const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Budget {
    _id: ID!
    date: Date!
    amount: Float!
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    created: Date!
    updated: Date
    budgets: [Budget]
  }
  input UserInput {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    created: Date
    updated: Date
    budgets: [BudgetInput]
  }
  input BudgetInput {
    _id: ID
    date: Date!
    amount: Float!
  }
  type Query {
    user(id:ID): User
    users: [User]
    currentUser: User 
    loginUser(email: String!, password: String!): Token
  }
  type Mutation {
    createUser(user:UserInput): User
    updateUser(user:UserInput): User
    deleteUser(id:ID): User
    createBudget(budget: BudgetInput): User
    updateBudget(budget: BudgetInput): User
    deleteBudget(id:ID, budgetId:ID): User
  }
  `;

module.exports = typeDefs;