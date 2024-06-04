import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client';

import App from './App.tsx';

const typeDefs = gql`
  extend enum Status {
    Alive
    Dead
    unknown
  }
  extend type Location {
    name: String!
  }

  extend type Character {
    id: Int!
    name: String!
    status: [Status]!
    location: Location
    image: String
  }
`;

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
  cache: new InMemoryCache(),
  typeDefs
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
