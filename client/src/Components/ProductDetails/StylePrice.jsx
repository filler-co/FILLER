import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

export default function StylePrice({selectedStyle}) {
  if (selectedStyle && selectedStyle.sale_price !== null) {
    return (
      <div>
        <b>USD</b>
        <span style={{color: 'red'}}>{selectedStyle.sale_price}</span>
        <span style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{selectedStyle.original_price}</span>
      </div>
    );
  }
  return (
    <div>
      <b>USD</b>
      {selectedStyle.original_price}
    </div>
  );
}
