import { useEffect, useState, React } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import token from '../../config.js'
import Reviews from './Components/Reviews/Reviews.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import Questions from './Components/Questions/Questions.jsx';

export default function App() {
  const [productList, setProductList] = useState([]);
  const [renderedProduct, setRenderedProduct] = useState({});

  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', { headers: { Authorization: token.TOKEN } })
      .then((data) => { setProductList(data.data); setRenderedProduct(data.data[0]); });
  }, []);

  // useEffect(() => {
  //   if (productList.length > 0) {
  //     setRenderedProduct(productList[0]);
  //   }
  // }, [productList]);

  return (

    <div>
      <ProductDetails renderedProduct={renderedProduct} />
      <Reviews renderedProduct={renderedProduct} />
      <Questions renderedProduct={renderedProduct} />
    </div>

  );
}

ReactDOM.render(<App />, document.getElementById('root'));
