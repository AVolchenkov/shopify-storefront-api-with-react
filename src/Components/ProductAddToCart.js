import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import CART_ADD from '../query/addToCart';
import CART_CHECK from '../query/cartCheck';
import ProductMessages from './ProductMessages';

const ProductForm = (props) => {
  const [quantity, onInputChange] = useState(1);
  const [choseVariant, onChoseVariantChange] = useState("");
  const [successfulAddition, onSuccessfulAdditionChange] = useState("");
  const [checkProductOnStockInCart, onCheckProductOnStockInCartChange] = useState("");
  const productId = props.productId
  const idForQuery = JSON.parse(localStorage.getItem('cartId'));

  const cartData = useQuery(CART_CHECK, {
    variables: { idForQuery },
    onCompleted: data => {
      data.cart.lines.edges.forEach(product => {
        if (product.node.merchandise.id === productId) {
          if (product.node.quantity === props.quantityInStockAvailable) {
            console.log(333333333333);
            onCheckProductOnStockInCartChange(
              "Only " + props.quantityInStockAvailable + " items for this option are available and these " + props.quantityInStockAvailable + " options are already in the cart"
            )
          } else {
            onCheckProductOnStockInCartChange("");
          }
        }
      })
    }
  });

  const onChangeQuantity = () => (event) => {
    onInputChange(
      event.target.value
    )
  }

  useEffect(() => {
    if (!props.productAvailable) {
      onSuccessfulAdditionChange("")
    }
  }, [!props.productAvailable]);

  const [AddToCart, addToCartMutation] = useMutation(CART_ADD, {
    onCompleted: data => {
      cartData.refetch()
      if (data) {
        onSuccessfulAdditionChange("The product was added to the cart successfully")
        setTimeout(() => {
          onSuccessfulAdditionChange("")
        }, 2000);
      }
    }
  });
  if (addToCartMutation.error) return `Submission error! ${addToCartMutation.error.message}`;

  const OnSubmit = (event) => {
    event.preventDefault()
    if (productId) {
      onChoseVariantChange("")
    } else {
      onChoseVariantChange("Select product variant")
    }
    let variantArray = Object.values(props.select)
    let variantString;
    if (variantArray.length === 1) {
      variantString = variantArray.join('')
    } else {
      variantArray.reduce((acc, curr, index) => {
        variantString = index === 0 ? curr : acc + ' / ' + curr;
        return variantString
      })
    }
    if (!productId) {
      onSuccessfulAdditionChange("")
    }

    cartData.data.cart.lines.edges.forEach(product => {
      if (product.node.merchandise.id === productId) {
        if (product.node.quantity === props.quantityInStockAvailable) {
          onCheckProductOnStockInCartChange(
            "Only " + props.quantityInStockAvailable + " items for this option are available and these " + props.quantityInStockAvailable + " options are already in the cart"
          )
        } else {
          onCheckProductOnStockInCartChange("");
        }
      }
    })

    props.product.product.product.variants.edges.forEach(variant => {
      if (variant.node.title === variantString) {
        AddToCart({
          variables: {
            "cartId": JSON.parse(localStorage.getItem('cartId')),
            "lines": {
              "merchandiseId": productId,
              "quantity": +quantity
            }
          }
        });
      }
    })
  }

  return (
    <>
      {
        props.lowQuantityAvailable ?
          <div className='product-quantity__available'>
            {props.lowQuantityAvailable}
          </div> :
          ""
      }
      <form>
        <div className='product-form'>
          <input
            type={'number'}
            className={'product-form__quantity'}
            value={quantity}
            onChange={onChangeQuantity()}
          >
          </input>
          {
            addToCartMutation.loading ?
            <span>Submiting...</span> :
            <input type={'submit'} className={'product-form__btn'} value={"Add to cart"} onClick={OnSubmit} disabled={!props.productAvailable} />
          }
        </div>
        <ProductMessages
          choseVariant={choseVariant}
          productAvailable={props.productAvailable}
          successfulAddition={successfulAddition}
          checkProductOnStockInCart={checkProductOnStockInCart}
        />
      </form>
    </>
  )
}

export default ProductForm