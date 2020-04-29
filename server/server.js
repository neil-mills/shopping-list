// ** Entry point for Express ** //
require('dotenv').config();
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

// Import Express and Apollo Server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const context = require('./context');
const directives = require('./directives/isAuthenticated');

//import passport
const passport = require('passport');
require('./handlers/passport');
passport.initialize();
passport.session();

//Import mongoose
const mongoose = require('./config/database');

//Import GraphQL type defs
const typeDefs = require('./typeDefs');

//Import GraphQL resolvers
const resolvers = require('./resolvers');

//Initialize the Apollo server
const server = new ApolloServer({
  typeDefs: mergeTypes(typeDefs),
  resolvers: mergeResolvers(resolvers),
  context,
  schemaDirectives: directives
});

//Initialize an Express app
const app = express();

//Use the Express app as middleware in Apollo server
server.applyMiddleware({ app });

//Set the port that the Express app will listen to
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  //console.log(server);
  console.log(`Server running on http://localhost:3000/${server.graphqlPath}`);
});

