const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply Apollo server middleware to Express app
server.applyMiddleware({ app });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book-search', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Define the port and start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});
