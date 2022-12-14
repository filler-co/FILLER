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
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import ToggleBar from './Components/Shared/Togglebar.jsx';
import LoadingPage from './Components/LoadingPage.jsx';


export const ThemeContext = React.createContext(null);

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    background: ${(props) => (props.theme.bg)};
  }
`;

const Container = styled.div`
  display: grid;
  height: 100vh;
  ${'' /* background-color:grey; */}
  ${'' /* color: black; */}
  color: ${props => props.theme.font};
  grid-template-rows: .5fr .5fr .25fr .6fr .2fr .1fr .2fr;
  grid-gap: 0.25rem;
  grid-template-areas:
    "themeswitcher"
    "header"
    "announcements"
    "product-details"
    "reviews"
    "questions"
    "related-products";
`;

const ThemeSwitch = styled.div`
  font-weight:bold;
`;

const HeaderDiv = styled.div`
  padding: 5px;
  margin: 5px;
  padding-right: 0;
  margin-right: 0;
  display: flex;
  max-height: 8vh;
  flex-direction: row;
`;

const HeaderFillerDiv = styled.div`
 background: ${(props) => props.theme.bg === 'white'? 'black' : 'white'};
 width: 100%;
 height: 80%;
 color: ${(props) => props.theme.bg === 'white'? 'white' : 'black'};
 font-weight: bold;
 display: flex;
 align-items: center;
 font-size: 1.2;
 padding-left: 4px;
 justify-content: space-between;

`;

const CoSpan = styled.span`
  padding-top: 1.5%;
`;

const AnnouncementDiv = styled.div`
  color: ${(props) => props.theme.bg === 'white'? 'rgb(0,0,0,0.7)' : 'rgb(255,255,255, 0.7)'};
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
  cursor: pointer;
  border: none;
  padding-right: 1%;

  font-weight: bold;
  color: ${(props) => props.theme.bg === 'white'? 'white' : 'black'};
  background: ${(props) => props.theme.bg === 'white'? 'black' : 'white'};

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
  padding: 5px;
  margin: 5px;


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
  const [globalTheme, setGlobalTheme] = useState({bg:'white', font:'black'});

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



  const handleTheme = (event) => {
    const color = (globalTheme.bg === 'white') ? {bg:'black', font:'white'} : {bg:'white', font:'black'}
    setGlobalTheme(color);
  }


  if (!renderedProduct.id) {
    return (<LoadingPage/>);
  } else {
    return (
<ThemeProvider theme={globalTheme}>
<Container>
      <GlobalStyle />
      <ThemeContext.Provider value={{theme}}>
        <HeaderDiv>
          <ImgLogo src={imgLogo} alt="FILLER IMG"/>
          <TextLogo src={(globalTheme.bg==='white')?textLogo:textLogoDark} alt = "FILLER TEXT"/>
          <HeaderFillerDiv><CoSpan>co.</CoSpan>
            <ThemeButton onClick={handleTheme}>{globalTheme.bg === 'white' ? 'BLACKOUT' : 'WHITEOUT'}</ThemeButton>
          </HeaderFillerDiv>
        </HeaderDiv>


          <AnnouncementDiv>SITE-WIDE ANNOUNCEMENT MESSAGE - <u>NEW PRODUCTS ON SALE</u></AnnouncementDiv>
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
</ThemeProvider>
  )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
