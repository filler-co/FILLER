import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import token from '../../config.js'
import Reviews from './Components/Reviews/Reviews.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import {Questions} from './Components/Questions/Questions.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import styled from 'styled-components';
import imgLogo from './Assets/fillerimglogo.png';
import textLogo from './Assets/fillertextlogo.png';
import textLogoDark from './Assets/fillertextlogodark.png';
import {createGlobalStyle} from 'styled-components';

export const ThemeContext = React.createContext(null);

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
  }
`;

const Container = styled.div`
  display: grid;
  height: 100vh;

  color: black;
  grid-template-rows: .5fr .25fr 6fr 2fr 1fr 2fr;
  grid-gap: 0.25rem;
  ${'' /* text-align-center; */}
  grid-template-areas:
    "header"
    "announcements"
    "product-details"
    "reviews"
    "questions"
    "related-products";

  z-index: 1;
`;

const HeaderDiv = styled.div`
  padding: 5px;
  margin: 5px;
  display: flex;
  max-height: 8vh;
  flex-direction: row;
`;

const HeaderFillerDiv = styled.div`
 background: black;
 width: 100%;
 height: 80%;
 color: white;
 font-weight: bold;
 display: flex;
 align-items: flex-end;
 font-size: 1.2;
 padding-left: 4px;

`;

const AnnouncementDiv = styled.div`
  color: rgb(0,0,0,0.7);
  font-style: italic;
  display: flex;
  justify-content: center;
  font-size: .8rem;
`;

const ImgLogo = styled.img`
  width: auto;
  height: 80%;
  object-fit: scale-down;
`;

const TextLogo = styled.img`
  width: auto;
  height: 100%;
  object-fit: scale-down;
`;

const ThemeButtonContainer = styled.div`

`;

const ThemeButton = styled.button`

`;


const PDdiv = styled.div`
  grid-area: product-details;
  padding: 5px;
  margin:5px;
  z-index: 1;
  height: 75vh;
  padding-bottom: 3vh;
`;

const Qdiv = styled.div`
  grid-area: questions;
  ${'' /* border: solid 1px black; */}
  padding: 5px;
  margin:5px;
`;

const Rdiv = styled.div`
  grid-area: reviews;
  border: solid 1px lightblue;
  padding: 5px;
  margin:5px;
  background: blushlavender

`;

const RPdiv = styled.div`
  grid-area: related-products;
  ${'' /* border: solid 1px black; */}
  padding: 2px;
  margin:2px;
`;



export function App() {
  const [renderedProduct, setRenderedProduct] = useState({});
  const [localInfo, setLocalInfo] = useState(JSON.parse(localStorage.getItem('cookie')));
  const [theme, setTheme] = useState(true);

  const changeRenderedProduct = (id) => {
    axios.get(`/products/${id}`, { headers: { Authorization: token.TOKEN } })
      .then((data) => { setRenderedProduct(data.data); });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favorites'))) {
      setLocalInfo(JSON.parse(localStorage.getItem('favorites')))
    } else {
      localStorage.setItem('favorites', JSON.stringify({}))
      setLocalInfo(JSON.parse(localStorage.getItem('favorites')))
    }
    axios.get('/products', { headers: { Authorization: token.TOKEN } })
      .then((data) => { setRenderedProduct(data.data[0]); });
  }, []);

  const [revNum, setRevNum] = useState(2);
  const [qNum, setqNum] = useState(2);
  const ref = React.useRef(null);

  const updateFavorites = (styleId) => {
    if (localInfo[styleId]) {
      delete localInfo[styleId];
      localStorage.setItem('favorites', JSON.stringify(localInfo))
      setLocalInfo(JSON.parse(localStorage.getItem('favorites')));
    } else {
      localInfo[styleId] = true;
      localStorage.setItem('favorites', JSON.stringify(localInfo))
      setLocalInfo(JSON.parse(localStorage.getItem('favorites')));
    }
  }

  const handleReviewScrollClick = () => {
    ref.current.scrollIntoView({behavior: 'smooth'});
  };


  return (

    <Container>
      <GlobalStyle />
      <ThemeContext.Provider value={{theme}}>
        <HeaderDiv>
          <ImgLogo src={imgLogo} alt="FILLER IMG"/>
          <TextLogo src={theme?textLogo:textLogoDark} alt = "FILLER TEXT"/>
          <HeaderFillerDiv> co.</HeaderFillerDiv>
        </HeaderDiv>
        <AnnouncementDiv>SITE-WIDE ANNOUNCEMENT MESSAGE - NEW PRODUCTS ON SALE</AnnouncementDiv>
        <PDdiv>
          <ProductDetails
            renderedProduct={renderedProduct}
            handleReviewScrollClick={handleReviewScrollClick}
            favoritesInfo ={localInfo}
            updateFavorites={updateFavorites}
          />
        </PDdiv>
        <Rdiv>
          <Reviews refProp={ref} renderedProduct={renderedProduct} setRevNum={setRevNum} revNum={revNum}/>
        </Rdiv>
        <Qdiv>
          <Questions renderedProduct={renderedProduct} setqNum={setqNum} qNum={qNum}/>
        </Qdiv>
        <RPdiv>
          <RelatedProducts
            changeRenderedProduct={changeRenderedProduct}
            productId={renderedProduct.id}
            setRevNum={setRevNum}
            setqNum={setqNum}
          />
        </RPdiv>
      </ThemeContext.Provider>
    </Container>

  );
}

ReactDOM.render(<App />, document.getElementById('root'));
