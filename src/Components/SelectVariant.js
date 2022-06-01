import React from "react";
import { useState } from 'react';
import ProductPrice from '../Components/ProductPrice';

const SelectVariant = (product, options) => {
  const propertyNames = Object.keys(product.options);
  const propertyValues = Object.values(product.options);
  const [select, onSelectChange] = useState(
    propertyNames.reduce((acc, curr) => (acc[curr] = '', acc), {})
  )
  const [price, onChangePrice] = useState(
    product.product.product.variants.edges[0].node.priceV2.amount + " " + product.product.product.variants.edges[0].node.priceV2.currencyCode
  )
  const [comparePrice, onChangeComparePrice] = useState(
    product.product.product.variants.edges[0].node.compareAtPriceV2.amount + " " + product.product.product.variants.edges[0].node.compareAtPriceV2.currencyCode
  )

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
    variantArray.reduce((acc, curr, index) => {
      variantString = index === 0 ? curr : acc + ' / ' + curr;
      return variantString
    })

    product.product.product.variants.edges.forEach(variant => {
      if (variant.node.title === variantString) {
        onChangePrice(
          variant.node.priceV2.amount + " " + variant.node.priceV2.currencyCode
        )
      }
    })

    product.product.product.variants.edges.forEach(variant => {
      if (variant.node.title === variantString) {
        onChangeComparePrice(
          variant.node.compareAtPriceV2.amount + " " + variant.node.compareAtPriceV2.currencyCode
        )
      }
    })
  }
  return (
    <>
      <ProductPrice price={price} comparePrice={comparePrice}/>
      <div className="product-selects">
        {
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
    </>
  )
};

export default SelectVariant