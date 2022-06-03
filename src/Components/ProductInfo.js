import React, { useEffect } from "react";
import { useState } from 'react';
import ProductForm from "./ProductAddToCart";
import ProductPrice from './ProductPrice';

const SelectVariant = (product) => {
  const propertyNames = Object.keys(product.options);
  const propertyValues = Object.values(product.options);
  const [select, onSelectChange] = useState(
    propertyNames.reduce((acc, curr) => (acc[curr] = "", acc), {})
  )
  const [price, onChangePrice] = useState(
    product.product.product.variants.edges[0].node.priceV2.amount + " " + product.product.product.variants.edges[0].node.priceV2.currencyCode
  )
  const [comparePrice, onChangeComparePrice] = useState('')
  const [productDefaultVariant] = useState(
    product.product.product.variants.edges[0].node.title
  );
  const [productId, onIdChange] = useState("");
  const [lowQuantityAvailable, onLowQuantityAvailableChange] = useState("");
  const [quantityInStockAvailable, onQuantityInStockAvailableChange] = useState(0);
  const [productAvailable, onProductAvailableChange] = useState(true);

  useEffect(() => {
    if (productDefaultVariant === "Default Title") {
      onIdChange(product.product.product.variants.edges[0].node.id)
      onSelectChange(["Default Title"])
    }
    if (product.product.product.variants.edges[0].node.compareAtPriceV2 != null) {
      onChangeComparePrice(
        product.product.product.variants.edges[0].node.compareAtPriceV2.amount + " " + product.product.product.variants.edges[0].node.compareAtPriceV2.currencyCode
      )
    }
  }, [productDefaultVariant, product.product.product.variants.edges]);

  const onChangeVariant = (name) => (event) => {
    let value = event.target.value
    onSelectChange({
      ...select,
      [name]: value
    })
    let variantObject = {
      ...select,
      [name]: value
    }
    let variantArray;
    let variantString = ""
    variantArray = Object.values(variantObject)
    if (variantArray.length === 1) {
      variantString = variantArray.join('')
    } else {
      variantArray.reduce((acc, curr, index) => {
        variantString = index === 0 ? curr : acc + ' / ' + curr;
        return variantString
      })
    }
    for (let key in variantObject) {
      if (key === variantObject[key]) {
        onIdChange("")
      }
    }
    product.product.product.variants.edges.forEach(variant => {
      if (variant.node.title === variantString) {
        onChangePrice(
          variant.node.priceV2.amount + " " + variant.node.priceV2.currencyCode
        )
        if (variant.node.compareAtPriceV2 != null) {
          onChangeComparePrice(
            variant.node.compareAtPriceV2.amount + " " + variant.node.compareAtPriceV2.currencyCode
          )
        } else {
          onChangeComparePrice("");
        }
        onIdChange(variant.node.id);
        onProductAvailableChange(variant.node.availableForSale);
        onQuantityInStockAvailableChange(variant.node.quantityAvailable)
        if (variant.node.quantityAvailable <= 10 && variant.node.quantityAvailable > 0 && variant.node.availableForSale) {
          onLowQuantityAvailableChange("Only " + variant.node.quantityAvailable + " items left in stock")
        } else {
          onLowQuantityAvailableChange("")
        }
      }
    })
  }
  return (
    <>
      <ProductPrice price={price} comparePrice={comparePrice} />
      <div className="product-selects">
        {
          productDefaultVariant === "Default Title" ? "" :
            propertyNames.map((item, i) => (
              <select className="product-select-variant" value={select[item]} key={i} onChange={onChangeVariant(item)}>
                <option value={item}>{item}</option>
                {item}
                {
                  propertyValues.map((item, id) => {
                    if (id === i) {
                      return (
                        item.map(variant => {
                          return (
                            <option value={variant.value} key={variant.value + id}>{variant.value}</option>
                          )
                        })
                      )
                    }
                  })
                }
              </select>
            ))
        }
      </div>
      <ProductForm
        product={product}
        select={select}
        productId={productId}
        productAvailable={productAvailable}
        lowQuantityAvailable={lowQuantityAvailable}
        quantityInStockAvailable={quantityInStockAvailable}
      />
    </>
  )
};

export default SelectVariant