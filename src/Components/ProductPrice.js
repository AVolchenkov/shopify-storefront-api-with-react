import React from "react";

const ProductPrice = (price) => {

  return (
    <div className="product-price">
      <div className="product-price__new">
        New price: {price.price}
      </div>
      <div className="product-price__old">
        Old price: {price.comparePrice}
      </div>

    </div>
  )
};

export default ProductPrice