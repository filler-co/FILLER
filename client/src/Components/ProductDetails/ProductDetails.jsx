import React from 'react';

export default function ProductDetails({renderedProduct}) {
  return (
    <div className="product-details">{renderedProduct.name}</div>
  )
};


