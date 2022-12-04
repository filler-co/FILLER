import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

const PDContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr, 0.5fr;
  grid-template-rows: 1fr, 1.5fr, 0.5fr, 1fr, 2.5fr, 1fr, 0.5fr;
  grid-template-areas:
  "product-image product-stars"
  "product-image product-title"
  "product-image product-price"
  "product-image product-style"
  "product-image style-list"
  "product-image product-dropdowns"
  "product-image cart-favorite";
`;

const PDImgContainer = styled.div`
  grid-area: product-image;
  background: cornflowerblue;
  text-align: center;
`;

const PDStarsContainer = styled.div`
  grid-area: product-stars;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;

const PDNameContainer = styled.div`
  grid-area: product-title;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;

const PDPriceContainer = styled.div`
  grid-area: product-price;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;
const PDStyleNameContainer = styled.div`
  grid-area: product-style;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;
const StyleListContainer = styled.div`
  grid-area: style-list;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;
const PDDropdownsContainer = styled.div`
  grid-area: product-dropdowns;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;

const PDButtonsContainer = styled.div`
  grid-area: cart-favorite;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;

export default function ProductDetails({renderedProduct, changeRenderedProduct}) {
  return (
    <PDContainer>
      <PDImgContainer>IMAGE</PDImgContainer>
      <PDStarsContainer>
        STARS
      </PDStarsContainer>
      <PDNameContainer>
        PRODUCT NAME:
        {renderedProduct.name}
      </PDNameContainer>
      <PDPriceContainer>
        PRICE
      </PDPriceContainer>
      <PDStyleNameContainer>
        STYLE NAME
      </PDStyleNameContainer>
      <StyleListContainer>
        STYLE LIST
      </StyleListContainer>
      <PDDropdownsContainer>
        DROPDOWNS
      </PDDropdownsContainer>
      <PDButtonsContainer>
        BUTTONS
      </PDButtonsContainer>





    </PDContainer>
  );
}
