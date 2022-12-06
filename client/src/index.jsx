import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import token from '../../config.js'
import Reviews from './Components/Reviews/Reviews.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import Questions from './Components/Questions/Questions.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  height: 100vh;
  color: black;
  grid-template-rows: 6fr 2fr 1fr 2fr;
  grid-gap: 0.25rem;
  text-align-center;
  grid-template-areas:
    "product-details"
    "reviews"
    "questions"
    "related-products";
`;

const PDdiv = styled.div`
  grid-area: product-details;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;

const Qdiv = styled.div`
  grid-area: questions;
  border: solid 1px black;
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
  border: solid 1px maroon;
  padding: 5px;
  margin:5px;
`;



export default function App() {
  const [renderedProduct, setRenderedProduct] = useState({});

  const changeRenderedProduct = (id) => {
    axios.get(`/products/${id}`, { headers: { Authorization: token.TOKEN } })
      .then((data) => { setRenderedProduct(data.data); });
  };

  useEffect(() => {
    axios.get('/products', { headers: { Authorization: token.TOKEN } })
      .then((data) => { setRenderedProduct(data.data[0]); });
  }, []);

  const [revNum, setRevNum] = useState(2);


  return (

    <Container>
      <PDdiv>
        <ProductDetails
          renderedProduct={renderedProduct}
        />
      </PDdiv>
      <Rdiv>
        <Reviews renderedProduct={renderedProduct} setRevNum={setRevNum} revNum={revNum}/>
      </Rdiv>
      <Qdiv>
        <Questions renderedProduct={renderedProduct} />
      </Qdiv>
      <RPdiv>
        <RelatedProducts
          changeRenderedProduct={changeRenderedProduct}
          productId={renderedProduct.id}
          setRevNum={setRevNum}
        />
      </RPdiv>
    </Container>

  );
}

ReactDOM.render(<App />, document.getElementById('root'));
