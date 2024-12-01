import React from 'react';
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import SearchBooks from './components/SearchBooks';
import SavedBooks from './components/SavedBooks';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <SearchBooks />
      <SavedBooks />
      <LoginForm />
      <SignupForm />
    </ApolloProvider>
  );
}

export default App;
