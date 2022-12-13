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
  justify-content: flex-start;
  padding-top: 8%;
`;


const PDStarsContainer = styled.div`
  padding: 5px;
  margin:5px;
  font-size: smaller;
  width: 35vw;
`;

const ScrollSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: #6cccdd;
`;

const PDNameContainer = styled.div`
  padding: 5px;
  margin:5px;
  font-size: 300%;
  font-weight: bold;
  width: 35vw;
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
`;

const PDPriceContainer = styled.div`
  padding-top: 0;
  margin-top: 0;
  padding: 5px;
  margin:5px;
  width: 35vw;
`;
const PDStyleNameSpan = styled.span`
font-weight: bold;

`;

const SelectStyleSpan = styled.span`

`;

const SelectStyleDiv = styled.div`
  font-size: unset;
  padding-bottom: 10px;
`;
const StyleListContainer = styled.div`
  padding: 5px;
  margin:5px;
  width: 100%;
  width: 35vw;
  font-size: 120%;
`;
const PDDropdownsContainer = styled.div`
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
        <StyleListContainer>
          <SelectStyleDiv><SelectStyleSpan>Style:</SelectStyleSpan><PDStyleNameSpan>{" " + selectedStyle.name}</PDStyleNameSpan></SelectStyleDiv>
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
