import React from "react";
import { Carousel } from "react-responsive-carousel";

const ProductGallery = (product) => {
  return (

    <Carousel dynamicHeight showArrows={false} showStatus={false} showIndicators={false}>
      {
        product.product.product.images.edges.map((image, i) => (
          <img alt={image.node.altText} src={image.node.src} key={i} />
        ))
      }
    </Carousel>
  )
};

export default ProductGallery