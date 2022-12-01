import React from 'react';
import RelatedProducts from './RelatedProducts.jsx';

export default function ProductDetails({renderedProduct, changeRenderedProduct}) {
  return (
    <div className="product-details-container">
      <div className="main">{renderedProduct.name}</div>
      <RelatedProducts
        changeRenderedProduct={changeRenderedProduct}
        productId={renderedProduct.id}
      />
    </div>

  )
};

