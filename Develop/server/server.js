const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Define an async function to start the Apollo server and apply middleware
const startServer = async () => {
  await server.start(); // Wait for Apollo Server to start
  server.applyMiddleware({ app }); // Apply the Apollo Server middleware to the app

  // Now, start the Express server
  app.listen({ port: 3001 }, () =>
    console.log(`Server running at http://localhost:3001${server.graphqlPath}`)
  );
};

startServer(); // Call the async function to start the server

