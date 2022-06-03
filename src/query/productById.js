import { gql } from '@apollo/client';

const PRODUCT_QUERY_BY_ID = gql`
  query Product($idForQuery: ID!) {
    product(id: $idForQuery) {
        descriptionHtml
        handle
        title
        id
        images(first: 250) {
          edges {
            node {
              src
              altText
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
              id
              title
              availableForSale
              quantityAvailable
              selectedOptions {
                name
                value
              }
            }
          }
        
      }
    }
  }
`;

export default PRODUCT_QUERY_BY_ID