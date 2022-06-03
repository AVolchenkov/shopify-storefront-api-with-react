import { gql } from '@apollo/client';

const CART_CREATE = gql`
mutation {
  cartCreate(
    input: {
    }
  ) {
    cart {
      id
    }
  }
}
`;

export default CART_CREATE