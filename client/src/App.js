import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import JobPostForm from './pages/JobPostForm';
import LandingPage from './components/LandingPage';
import SearchResults from './components/SearchResults';
import JobPage from './pages/JobPage';
import Dashboard from './pages/Dashboard';


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
            path='/postJob'
            element={<JobPostForm />}
          />
          <Route 
            path='*'
            element={<LandingPage />}
          />
          <Route 
          path="/searchResults/:keyword" 
          element={<SearchResults />} 
        />
          <Route
          path="/JobPage/:jobId"
          element={<JobPage />}
          />
          <Route
          path="/dashboard"
          element={<Dashboard />}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
