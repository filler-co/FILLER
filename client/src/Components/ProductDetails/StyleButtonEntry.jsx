import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

export default function StyleButtonEntry({ selectedStyleId, productStyle, setSelectedStyle}) {
  return (
    <div>
      {productStyle.name}
    </div>
  );
}
