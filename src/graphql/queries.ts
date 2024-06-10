import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query Character($page: Int!, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      results {
        id
        name
        status
        image
        species
        location {
          name
        }
        origin {
          name
        }
      }
      info {
        count
        pages
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        name
      }
      created
    }
  }
`;
