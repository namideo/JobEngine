import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import SearchBooks from './pages/SearchBooks';
// import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// The apollo client provides authentication by using the following 'Header' method
// createHttpLink returns a new instance of ApolloLink
const httpLink = createHttpLink({
  uri: '/graphql'
});

// The setContext takes 2 parameters, the GraphQL request and the previous context.
// In this method evry HTTP request will have a JWT token attached as the  authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return{
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='*'
            element={<h1 className='display-2'>Welcome!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
