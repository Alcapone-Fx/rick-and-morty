import {
  ApolloClient,
  InMemoryCache,
  gql,
} from '@apollo/client';

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

export const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
  cache: new InMemoryCache(),
  typeDefs,
});
