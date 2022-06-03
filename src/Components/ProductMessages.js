import React from "react";

const ProductMessages = (props) => {

  return (
    <div>
      {
        props.choseVariant != "" ?
            <div className="error">
              {props.choseVariant}
            </div>
            : ""
        }
        {
          !props.productAvailable != "" ?
            <div className="error">
              This variant out of stock
            </div>
            : ""
        }
        {
          props.successfulAddition != "" && props.checkProductOnStockInCart == "" ?
            <div className="success">
              {props.successfulAddition}
            </div>
            : ""
        }
        {
          props.checkProductOnStockInCart != "" ?
            <div className="danger">
              {props.checkProductOnStockInCart}
            </div>
            : ""
        }
    </div>
  )
};

export default ProductMessages