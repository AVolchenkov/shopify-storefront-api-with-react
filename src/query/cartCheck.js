import { gql } from '@apollo/client';

const CART_CHECK = gql`
query Cart($idForQuery: ID!) {
  cart(id: $idForQuery) {
    id
    note
    attributes {
        key
        value
    }
    lines(first: 250) {
      edges {
        node {
          quantity
          id
          merchandise {
            ... on ProductVariant {
              id
              price
              sku
              title
              weight
              image {
                src
              }
              product {
                handle
                title
                vendor
                publishedAt
              }
            }
          }
        }
      }
    }
  }
}
`;

export default CART_CHECK