import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';
import axios from 'axios';
import token from './../../../../config.js';
import StylePrice from './StylePrice.jsx';
import StyleImage from './StyleImage.jsx';
import StyleButtons from './StyleButtons.jsx';
import StyleDropdowns from './StyleDropdowns.jsx';

const PDContainer = styled.div`
  display: grid;
  grid-template-columns: 50%, 50%;
  grid-template-rows: 1fr, 1.5fr, 0.5fr, 1fr, 2.5fr, 1.5fr;
  grid-template-areas:
  "product-image product-stars"
  "product-image product-title"
  "product-image product-price"
  "product-image product-style"
  "product-image style-list"
  "product-image product-dropdowns";
  height: 80vh;
  min-height: 10px;
`;

const PDImgContainer = styled.div`
  grid-area: product-image;
  text-align: center;
  margin:5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55vw;
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
  width: 100%;
`;
const PDDropdownsContainer = styled.div`
  grid-area: product-dropdowns;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;


export default function ProductDetails({handleReviewScrollClick,renderedProduct, changeRenderedProduct}) {
  const [productStyles, setProductStyles] = React.useState([]);
  const [selectedStyle, setSelectedStyle] = React.useState({});
  let myRef = React.useRef();
  React.useEffect(() => {
    if (renderedProduct.id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${renderedProduct.id}/styles`, { headers: { Authorization: token.TOKEN } })
        .then((data) => {
          setProductStyles(data.data.results); setSelectedStyle(data.data.results[0]);
        });
    }
  }, [renderedProduct]);

  const changeStyle = (styleObj) => {
    setSelectedStyle(styleObj);
  };
  return (
    <PDContainer>
      <PDImgContainer>
        <StyleImage selectedStylePhotos={selectedStyle.photos} />
      </PDImgContainer>
      <PDStarsContainer onClick={handleReviewScrollClick}>
        Scroll to Reviews
      </PDStarsContainer>
      <PDNameContainer>
        {renderedProduct.name}
      </PDNameContainer>
      <PDPriceContainer>
        <StylePrice selectedStyle={selectedStyle} />
      </PDPriceContainer>
      <PDStyleNameContainer>
        {selectedStyle.name}
      </PDStyleNameContainer>
      <StyleListContainer>
        <StyleButtons
          selectedStyleId={selectedStyle.style_id}
          productStyles={productStyles}
          changeStyle={changeStyle}
        />
      </StyleListContainer>
      <PDDropdownsContainer>
        <StyleDropdowns selectedStyle={selectedStyle} />
      </PDDropdownsContainer>

    </PDContainer>
  );
}
