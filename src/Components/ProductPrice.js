import React from "react";

const ProductPrice = (props) => {

  return (
    <div className="product-price">
      <div className="product-price__new">
        New price: {props.price}
      </div>
      {
        props.comparePrice != "" ?
          <div className="product-price__old">
            Old price: {props.comparePrice}
          </div>
          :
          ""
      }
    </div>
  )
};

export default ProductPrice