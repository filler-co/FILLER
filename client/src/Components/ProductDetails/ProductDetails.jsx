import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

const PDContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr, 0.5fr;
  grid-template-areas:
  "product-image product-specs";
`;

const PDImgContainer = styled.div`
  grid-area: product-image;
  background: cornflowerblue;
  text-align: center;
`;

const PDSpecsContainer = styled.div`
  grid-area: product-specs;
  background: white;
`;

export default function ProductDetails({renderedProduct, changeRenderedProduct}) {
  return (
    <PDContainer>
      <PDImgContainer>IMAGE</PDImgContainer>
      <PDSpecsContainer>
        <div className="main">PRODUCT NAME: {renderedProduct.name}</div>
      </PDSpecsContainer>
    </PDContainer>
  );
}
