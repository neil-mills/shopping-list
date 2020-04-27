// ** Entry point for Express ** //

require('dotenv').config();
// Import Express and Apollo Server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

//Import mongoose
const mongoose = require('./config/database');

//Import GraphQL type defs
const typeDefs = require('./modules/post/post.schema.graphql');

//Import GraphQL resolvers
const resolvers = require('./modules/post/post.resolvers');

//Initialize the Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

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

