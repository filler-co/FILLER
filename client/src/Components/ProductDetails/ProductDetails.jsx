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
  "product-image product-details"
  "product-image product-details"
  "product-image product-details"
  "product-image product-details"
  "product-image product-details"
  "product-image product-details";
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

const PDDetailsDiv = styled.div`
  grid-area: product-details;
  display:flex;
  flex-direction: column;
  justify-content: center;
`;


const PDStarsContainer = styled.div`
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
  font-size: smaller;
  text-decoration: underline;
  width: 35vw;
`;

const ScrollSpan = styled.span`
  cursor: pointer;
`;

const PDNameContainer = styled.div`
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
  font-size: x-large;
  width: 35vw
`;

const PDPriceContainer = styled.div`
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
  width: 35vw;
`;
const PDStyleNameContainer = styled.div`
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
  width: 35vw;
  font-size: large;
`;

const SelectStyleDiv = styled.div`
  font-size: unset;
`;
const StyleListContainer = styled.div`
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
  width: 100%;
  width: 35vw;
`;
const PDDropdownsContainer = styled.div`
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
  max-height: 10vh;
`;


export default function ProductDetails({handleReviewScrollClick,renderedProduct, favoritesInfo, updateFavorites}) {
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
      <PDDetailsDiv>
        <PDStarsContainer onClick={handleReviewScrollClick}>
          <ScrollSpan>See product reviews.</ScrollSpan>
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
        <SelectStyleDiv>Select Style:</SelectStyleDiv>
        <StyleButtons
          selectedStyleId={selectedStyle.style_id}
          productStyles={productStyles}
          changeStyle={changeStyle}
        />
      </StyleListContainer>
      <PDDropdownsContainer>
        <StyleDropdowns updateFavorites={updateFavorites} favoritesInfo={favoritesInfo} selectedStyle={selectedStyle} />
      </PDDropdownsContainer>
      </PDDetailsDiv>


    </PDContainer>
  );
}
