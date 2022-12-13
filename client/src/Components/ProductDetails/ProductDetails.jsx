import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';
import axios from 'axios';
import token from './../../../../config.js';
import StylePrice from './StylePrice.jsx';
import StyleImage from './StyleImage.jsx';
import StyleButtons from './StyleButtons.jsx';
import StyleDropdowns from './StyleDropdowns.jsx';
import StarHandler from './../Shared/StarHandler.jsx';

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
  height: 100%;
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
  font-size: smaller;
  width: 35vw;
  display: flex;
`;

const ScrollSpan = styled.span`
  text-decoration: underline;
  padding-left: 2%;
  cursor: pointer;
  color: rgb(0,0,0,0.7);
`;

const PDNameContainer = styled.div`
  padding: 5px;
  margin:5px;
  font-size: 2.25rem;
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



`;

const SelectStyleSpan = styled.span`
font-weight: bold;
font-size: 0.9rem;

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
  font-size: 1.1rem;
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
          <StarHandler renderedProduct={renderedProduct.id} single={false}/>
          <ScrollSpan>{' '+'Read product reviews.'}</ScrollSpan>
        </PDStarsContainer>
        <PDNameContainer>
          {renderedProduct.name}
        </PDNameContainer>
        <PDPriceContainer>
          <StylePrice selectedStyle={selectedStyle} />
        </PDPriceContainer>
        <StyleListContainer>
          <SelectStyleDiv><SelectStyleSpan>STYLE:</SelectStyleSpan><PDStyleNameSpan>{" " + selectedStyle.name}</PDStyleNameSpan></SelectStyleDiv>
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
